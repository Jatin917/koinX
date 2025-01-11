import { currencySchema } from "../model/currencySchema.js";

const deviationCal = (arr) =>{
        const mean = arr.reduce((acc, currentV)=>acc+currentV.price, 0)/arr.length;
        const deviations = arr.map(num => num.price - mean);
        const meanAbsoluteDeviation = deviations.reduce((acc, currentV)=> acc+Math.pow((currentV-mean)/arr.length, 2), 0);
        return meanAbsoluteDeviation;
}
function sortByKeyDescending(array, key) {
    return array.sort((a, b) => {
        if (a[key] > b[key]) return -1;
        if (a[key] < b[key]) return 1;
        return 0;
    });
}

export const deviationController = async(req, res)=>{
    try {
        const id = req.query.coin;
        const response = await currencySchema.find({name:id});
        if(!response){
            throw new Error("didn't found any coin")
        }
        let sortedResponse = sortByKeyDescending(response, "timestamp");
        if(sortedResponse.length>100){
            sortedResponse = sortedResponse.slice(0,100);
        }
        console.log(sortedResponse);
        const ans = deviationCal(sortedResponse);
        return res.status(200).json({deviation:ans});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:error.message})
    }
}