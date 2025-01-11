import { currencySchema } from "../model/currencySchema.js";

function sortByKeyDescending(array, key) {
    return array.sort((a, b) => {
        if (a[key] > b[key]) return -1;
        if (a[key] < b[key]) return 1;
        return 0;
    });
}
export const statsController = async(req, res)=>{
    try {
        const id = req.query.coin;
        const response = await currencySchema.find({name:id});
        if(!response){
            throw new Error("didn't found any coin")
        }
        const latest = sortByKeyDescending(response, "timestamp")[0]
        return res.status(200).json({price:latest.price, marketCap:latest.marketCap, change24h:latest.change24h});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:error.message})
    }
}