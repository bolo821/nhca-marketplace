import * as Models from "../models"
import * as Basecon from "../controllers/baseController"

export default (io) => {
	io.on("connection", async (socket) => {

		let socketid = socket.id;
		let query = socket.handshake.query;
		if (query.auth) {
			let ses = await Models.Sessions.findOne({token: query.auth})
			if (ses) {
				let row = {
					userid: ses.userid,
					socketid
				}
				let sh = await Basecon.Update(row, {userid: row.userid}, Models.SocketSessions)
				
			} else {
				socket.emit("expiredestory", {expire: true})
			}
		}

		socket.on('binaryws_data', async (data) => {
			io.sockets.emit('trade_data', data);
		})

		socket.on("disconnect", async () => {
			await Models.SocketSessions.findOneAndDelete({socketid})
        })
	})

	
	setInterval( async () => {

		let d = await Models.Sessions.find({expiredtime: {
			$lte: new Date()
		}})

		if (d && d.length) {
			await Models.Sessions.deleteMany({expiredtime: {
				$lte: new Date()
			}})

			for (let i in d) {
				let soc = await Models.SocketSessions.findOne({userid: d[i].userid})
				if (soc) {
					io.to(soc.socketid).emit('expiredestory', {expire: true});
				}
			}
		}
	}, 1000);
}