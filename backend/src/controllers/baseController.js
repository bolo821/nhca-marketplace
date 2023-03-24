import md5 from 'md5'
import moment from 'moment-timezone'
import config from "../config"
import { Types } from 'mongoose'
import * as Models from "../models"
import url from 'url'
import fileconfig from "../../dir"
import fs from "fs"

export const getIPAddress = (req) => {
    const forwarded = req.headers['x-forwarded-for']
    const ips = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress
    return ips && ips.length > 0 && ips.indexOf(",") ? ips.split(",")[0] : null
}

export const imageDelete = (image) => {
    var del_path = fileconfig.BASEURL + image
    fs.unlink(del_path, async (err) => {
    })
    return true
}

export const imageMulti = (req, res, next) => {
    let d = req.files
    let row = {}
    console.log(d)
    for (let i in d) {
        row[d[i].fieldname] = [d[i].filename, d[i].originalname]
    }
    req.images = row
    next()
}

export const Create = async (data, model) => {
    const savehandle = new model(data)
    return await savehandle.save().then(result => {
        if (!result) {
            return false
        } else {
            return result
        }
    })
}


export const urlparse = (adr) => {
    var q = url.parse(adr, true);
    var qdata = q.query;
    return qdata;
}
export const Update = async (data, condition, model) => {
    return await model.findOneAndUpdate(condition, data, { new: true, upsert: true }).then(result => {
        if (!result) {
            return false
        } else {
            return result
        }
    })
}

export const signAccessToken = async (req, users_id) => {
    const expiredtime = getExpiredtime()
    const token = md5(users_id._id + expiredtime)
    const ip = getIPAddress(req)
    const row = {
        ip, token, expiredtime, userid: Types.ObjectId(users_id._id)
    }

    let islogin = await Models.Sessions.findOne({ userid: users_id._id })
    if (islogin) {
        await Models.Sessions.findOneAndDelete({ userid: users_id._id })
        await Models.SocketSessions.findOneAndDelete({ userid: users_id._id })

        const io = req.app.get("io");
        let expires = {
            [users_id.email]: true
        }
        io.sockets.emit("destroy", { data: expires })

    }
    await Create(row, Models.Sessions)

    return token
}

export const getTimeZone = () => {
    let time = moment.tz(new Date(), "Asia/Kolkata")
    time.utc("+530").format()
    return time
}

export const getExpiredtime = () => {
    const expiredtime = new Date(new Date().valueOf() + parseInt(config.USER_SESSION_TIME) * 1000)
    return expiredtime
}

export const sessionUpdate = async (token) => {
    const expiredtime = getExpiredtime()
    const ses = await Models.Sessions.findOneAndUpdate({ token }, { expiredtime }).populate("userid")
    if (ses) {
        return ses.userid
    } else {
        return false
    }
}

export const setpage = (params, totalcount) => {
    let { page, perPage } = params;
    let newparams = {};
    if (page !== undefined && perPage !== undefined) {
        var totalPages = Math.ceil(totalcount / perPage);
        let calculatedPage = (page - 1) * perPage;
        if (calculatedPage > totalcount) {
            newparams['page'] = 1;
            newparams['perPage'] = parseInt(perPage);
        } else {
            newparams['perPage'] = parseInt(perPage);
            newparams['page'] = parseInt(page);
        }
    } else {
        totalPages = Math.ceil(totalcount / 10);
        newparams['page'] = 1;
        newparams['perPage'] = 10;
    }

    let index1 = newparams.page == 0 ? 0 : newparams.page - 1;
    let index2 = newparams.page == 0 ? 1 : newparams.page;
    let skip = index1 * (newparams.perPage);
    let limit = index2 * (newparams.perPage);

    return { totalPages: totalPages, params: newparams, skip: skip, limit: limit, totalRecords: totalcount }
}

export const getAlertHtmlcode = (imgurl) => {
    let h = `<style>@keyframes _webpushrShowPromptBoxDrop-in{from{top:0}to{top:15px}}@keyframes _webpushrShowPromptBoxSlide-in{from{top:-300px}to{top:0}}@keyframes _webpushrSlideUpPromptBox{from{bottom:-1000px}to{bottom:0}}webpushrPromptConatiner{-webkit-animation:_webpushrShowPromptBoxSlide-in .5s forwards;animation:_webpushrShowPromptBoxSlide-in .5s forwards}webpushrPromptConatiner.Drop-in{-webkit-animation:_webpushrShowPromptBoxDrop-in 1s forwards;animation:_webpushrShowPromptBoxDrop-in 1s forwards}webpushrPromptConatiner{position:fixed;z-index:2147483647;top:15px;left:calc(50% - 245px);font-family:Arial,Helvetica,sans-serif!important;display:block}webpushrwppromptbox2_wrapper{position:relative;background:#fff;width:470px;padding:10px;padding-top:20px;display:block;box-shadow:0 0 0 -4px rgba(39,55,74,.25),0 15px 40px 10px rgba(39,55,74,.25);font-size:16px;line-height:20px;letter-spacing:normal;text-transform:initial;box-sizing:content-box}webpushrpromptconatiner.Slide-in webpushrwppromptbox2_wrapper{-webkit-border-radius:0 0 10px 10px;-moz-border-radius:0 0 10px 10px;border-radius:0 0 10px 10px}webpushrpromptconatiner.Drop-in webpushrwppromptbox2_wrapper{-webkit-border-radius:10px 10px 10px 10px;-moz-border-radius:10px 10px 10px 10px;border-radius:10px 10px 10px 10px}webpushrwppromptbox2_wrapper webpushrprompticon2{width:22%;float:left;display:block;margin:0 auto;text-align:center}webpushrwppromptbox2_wrapper webpushrprompticon2 img{width:75px;height:75px;display:inline-block}webpushrwppromptbox2_wrapper webpushrpromptbody2{width:72%;float:left;text-align:left;font-size:16px;padding-left:10px;box-sizing:content-box}webpushrwppromptbox2_wrapper webpushrpromptbox2 webpushrpromptbuttons2{position:relative;display:inline-block;clear:both;width:100%;font-size:10px;padding-top:10px;padding-bottom:8px;direction:ltr}webpushrwppromptbox2_wrapper webpushrpromptbox2 webpushrpromptbuttons2 webpushrpromptbtnapprove2,webpushrwppromptbox2_wrapper webpushrpromptbox2 webpushrpromptbuttons2 webpushrpromptbtndeny2{display:inline-block;float:right;margin-right:10px;min-width:107px}webpushrwppromptbox2_wrapper webpushrheadline2{font-weight:700;font-size:17px;padding-bottom:7px}webpushrwppromptbox2_wrapper webpushrheadline2,webpushrwppromptbox2_wrapper webpushrheadline2-byline{display:block;position:relative;text-align:initial}webpushrprompttext2{font-weight:400!important;display:block;text-align:initial}webpushrwppromptbox2_wrapper webpushrpromptbtnapprove2,webpushrwppromptbox2_wrapper webpushrpromptbtndeny2{cursor:pointer;transition:all 60ms ease-in-out;text-align:center;white-space:nowrap;border:0 none;border-radius:4px;padding:14px 20px;box-sizing:content-box}webpushrwppromptbox2_wrapper img.webpushrbell{margin:0 auto;cursor:pointer}webpushrwppromptbox2_wrapper webpushrpoweredby2{font-size:12px;font-family:Arial,Helvetica,sans-serif!important;padding:0 5px;text-align:left;display:inline-block;margin-left:5px;margin-top:20px;opacity:.3;font-weight:600}webpushrwppromptbox2_wrapper webpushrpoweredby2 svg{width:16px;fill:#000;position:relative;top:2px}webpushrwppromptbox2_wrapper webpushrpoweredby2 a,webpushrwppromptbox2_wrapper webpushrpoweredby2 a:hover{color:#000!important;font-size:12px!important;margin-left:-2px}@media only screen and (max-device-width:720px) and (orientation:landscape){webpushrwppromptbox2_wrapper{display:none}}@media (max-width:480px){webpushrPromptConatiner{left:0!important}webpushrwppromptbox2_wrapper{animation:_webpushrSlideUpPromptBox 1s forwards;border-radius:0!important;width:initial;position:fixed!important;bottom:-1000px;min-height:150px;padding-top:10px;width:100%;left:0;box-shadow:0 0 20px 3px rgba(0,0,0,.22)!important;box-sizing:border-box}webpushrpromptbox2{display:block;padding-top:10px}webpushrwppromptbox2_wrapper webpushrheadline2,webpushrwppromptbox2_wrapper webpushrpromptbox2 webpushrpromptbuttons2,webpushrwppromptbox2_wrapper webpushrprompttext2{font-size:14px}webpushrwppromptbox2_wrapper webpushrprompticon2 img{width:65px;height:65px}` +
        `webpushrwppromptbox2_wrapper webpushrpoweredby2{font-size:10px;margin-top:20px;display:none}webpushrwppromptbox2_wrapper webpushrpromptbox2 webpushrpromptbuttons2 webpushrpromptbtnapprove2,webpushrwppromptbox2_wrapper webpushrpromptbox2 webpushrpromptbuttons2 webpushrpromptbtndeny2{margin-top:10px}}._prompt_overlay{background:rgba(66,61,61,.83);position:absolute;top:0;left:0;right:0;bottom:0;z-index:2147483647;scroll-behavior:unset}#_prompt_overlay{display:none}webpushrpromptconatiner *{font-family:Arial,Helvetica,sans-serif!important;font-size:16px!important;letter-spacing:.2px}` +
        `webpushrwppromptbox2_wrapper webpushrpoweredby2 *{font-weight:400!important;font-size:14px!important}webpushrwppromptbox2_wrapper{background-color:#fff}webpushrprompticon2 img{visibility:visible!important}webpushrpromptbody2 webpushrheadline2{color:#333}webpushrpromptbody2 webpushrprompttext2{color:#333}webpushrpromptbtnapprove2{background-color:#1165f1;color:#fff;box-shadow:0 2px 5px rgba(0,0,0,.2)}webpushrpromptbtndeny2{background-color:#fff;color:#1165f1}` +
        `webpushrpoweredby2 span{color:#000;font-size:12px!important}</style><div id="_prompt_overlay"><webpushrpromptconatiner class="Slide-in"><webpushrwppromptbox2_wrapper><webpushrpromptbox2><webpushrprompticon2 class="webpushrbell"><img id="webpushr-prompt-logo" alt="Logo" src="${imgurl}"></webpushrprompticon2><webpushrpromptbody2><webpushrheadline2></webpushrheadline2><webpushrprompttext2>Would you like to receive notifications on latest updates?</webpushrprompttext2></webpushrpromptbody2><webpushrpromptbuttons2><webpushrpromptbtnapprove2 id="webpushr-approve-button">YES</webpushrpromptbtnapprove2><webpushrpromptbtndeny2 id="webpushr-deny-button">NOT YET</webpushrpromptbtndeny2></webpushrpromptbuttons2></webpushrpromptbox2></webpushrwppromptbox2_wrapper></webpushrpromptconatiner></div>`
    return h
}

export const getRole = (rid) => {
    let flag = ""
    rid = rid.toString()
    switch (rid) {
        case "60b3a7d00d8d71025067923c":
            flag = "superadmin"
            break;
        default:
            flag = "user"
            break;
    }
    return flag
}