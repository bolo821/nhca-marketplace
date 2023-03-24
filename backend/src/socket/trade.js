import io from 'socket.io-client'
import * as Models from "../models"
import axios from 'axios';

export default (WebSocket) => {
    const websocket = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=1089');
    let betList = [];

    function init() {
        websocket.onopen = () => { onOpen() }
        websocket.onclose = () => { onClose() }
        websocket.onmessage = (evt) => { onMessage(evt) }
        websocket.onerror = () => { onError() }
    }

    function onOpen() {
        websocket.send(JSON.stringify({
            ticks: 'frxAUDJPY'
        }))
    }

    function onClose() {
        console.log("this is socket close");
    }

    async function onMessage(evt) {
        let data = JSON.parse(evt.data)
        if (typeof data.msg_type == 'undefined') { return false }

        if (data.msg_type == 'history' && typeof data.history.prices != 'undefined' && typeof data.history.times != 'undefined') {
            const timesCount = data.history.times.length;
            const pricesCount = data.history.prices.length;
            const processedBets = [];
            if (timesCount && pricesCount && timesCount == pricesCount) {
                for (let i = 0; i < betList.length; i++) {
                    if (!betList[i].popup && data.history.times[0] * 1000 >= new Date(betList[i].endTime).getTime() && betList[i].betPairKey == data.echo_req.ticks_history) {
                        betList[i].popup = true;
                        betList[i].save();                
                        
                        betList[i].endPrice = data.history.prices[0];
                        if (betList[i].betType == 'high') {
                            if (data.history.prices[0] > betList[i].betPrice) {
                                betList[i].status = 'win';
                            } else if (data.history.prices[0] == betList[i].betPrice) {
                                betList[i].status = 'draw';
                            } else {
                                betList[i].status = 'lose';
                            }
                        } else if (betList[i].betType == 'low') {
                            if (data.history.prices[0] < betList[i].betPrice) {
                                betList[i].status = 'win';
                            } else if (data.history.prices[0] == betList[i].betPrice) {
                                betList[i].status = 'draw';
                            } else {
                                betList[i].status = 'lose';
                            }
                        }
                        await manageBalance(betList[i]);
                        processedBets.push(betList[i]);
                    }
                }
                await axios.post('http://localhost:3997/api/bet/checkBet', processedBets).catch(e=>{
                    console.log("error");
                });
            }
        } else if (data.msg_type == 'tick' && typeof data.error == 'undefined' && typeof data.tick.epoch != 'undefined' && typeof data.tick.quote != 'undefined') {
            let newTickDate = new Date(parseInt(data.tick.epoch, 10) * 1000);
            betList = await getBetList(newTickDate);
            console.log(newTickDate);
            console.log(new Date(), "---------server new date");

            let betPairs = await getBetPairs(newTickDate);
            for (let i = 0; i < betPairs.length; i++) {
                getRealPrice(betPairs[i]._id);
            }
        }
    }

    function onError() {
        console.log("this is socket errror");
    }

    function getRealPrice(betPair) {
        websocket.send(JSON.stringify({
            ticks_history: betPair,
            style: 'ticks',
            end: 'latest',
            adjust_start_time: 1,
            count: 1
        }))
    }

    init()

    async function getBetPairs(date) {
        let betPairs = await Models.BetHistory.aggregate([
            {
                $match: {
                    endPrice: 0,
                    endTime: {
                        $lte: date
                    },
                    popup: false
                }
            },
            {
                $group: {
                    _id: "$betPairKey",
                }
            }
        ])
        return betPairs;
    }

    async function getBetList(date) {
        let betList = await Models.BetHistory.find({
            endPrice: 0,
            endTime: {
                $lte: date
            },
            popup: false
        })

        return betList;
    }

    async function manageBalance(betInfo) {
        let rBalance = await Models.Balance.findOne({ userid: betInfo.userid });
        let newBalanceHistory = new Models.BalanceHistory();
        newBalanceHistory.betid = betInfo._id;
        newBalanceHistory.lastBalance = rBalance.balance;
        let resultCost = 0;
        if (betInfo.status == 'win') {
            resultCost = betInfo.betCost * (100 + betInfo.betPercent) / 100;
        } else if(betInfo.status == 'draw') {
            resultCost = betInfo.betCost;
        } else {
            resultCost = 0;
        }
        newBalanceHistory.updateBalance = rBalance.balance + resultCost;
        newBalanceHistory.save();
        rBalance.balance = newBalanceHistory.updateBalance;
        rBalance.save();
        betInfo.endCost = resultCost;
        betInfo.save();
    }
}