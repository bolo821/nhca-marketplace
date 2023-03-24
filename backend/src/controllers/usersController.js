import * as Models from "../models"

export const save = async (req, res, next) => {
    const nft = req.body
    let nftData = new Models.Users(nft)
    const result = await nftData.save()
    return res.json({ status: true, data: result })
}

export const get = async (req, res, next) => {
    const nft = req.body
    const nftId = nft.id;
    const result = await Models.Users.findOne({ _id: nftId })
    return res.json({ status: true, data: result })
}

export const edit = async (req, res, next) => {
    const data = req.body
    const result = await Models.Users.updateOne({ _id: data.id }, { $set: { data: data.data } });
    console.log(result)
    return res.json({ status: true, data: result })
}

export const view = async (req, res, next) => {
    const data = req._parsedOriginalUrl.query;
    try {
        const result = await Models.Users.findOne({ _id: data });
        console.log(result)
        return res.json({ status: true, data: result })
    } catch (e) {
        return res.json({ status: false, dataL: "No correct, Please input correct NFT id." });
    }
}
