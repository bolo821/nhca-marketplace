import  {sessionUpdate} from "../controllers/baseController"

export const verifyToken = async (req,res,next) => {
    try {
        const accessToken = req.headers.authorization
        if (accessToken && accessToken.length) {
            const d = await  sessionUpdate(accessToken)
            if (d) {
                req.user = d
                next()
            } else {
                return res.json({ status : false, session : true })
            }     
        } else {
            return res.json({ status : false, session : true })
        }
    } catch (err) {
        return res.json({ status : false, session : true })
    }
}
