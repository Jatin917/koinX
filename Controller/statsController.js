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
        const id = req.params.coin;
        const response = await currencySchema.findOne({name:id});
        const latest = sortByKeyDescending(response, timestamp)
        return res.json(latest);
    } catch (error) {
        console.log(error.message);
    }
}