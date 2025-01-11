import cron from 'node-cron'
import axios from 'axios'
import {timeStampSchema} from '../model/timeStamp.js';
import {currencySchema} from '../model/currencySchema.js';

const coins = ["ethereum", "bitcoin", "matic-network"];
const MAX_RETRY=5;
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const TWO_HOURS_IN_MS = 2 * 60 * 60 * 1000;


const schedulerWithRetry = async(name, retry=0) =>{
    const timeStamp = await timeStampSchema.findOne({name:name});
    if(timeStamp){
        const {lastExcution} = timeStamp;
        const timeElapsed = Date.now() - lastExcution;
        if(timeElapsed<TWO_HOURS_IN_MS){
            console.log("skipping as two hours didn't passed");
            return;
        }
    }
    try {
        const response = await fetchingAndUpdating(name); // fetching...
        if(response){
            await timeStampSchema.updateOne(
                {name:name},
                { lastExcution: Date.now() },
                { upsert: true }
            );
            console.log("Data Fetched Successfully");
            return;
        }
        if(retry<MAX_RETRY){
            console.log("Data Fetching again");
            await delay(2000);
            return await schedulerWithRetry(name, retry+1);
        }
        console.log("Max Limit reached");
        return;
    } catch (error) {
        console.log(error.message);
        if (retry < MAX_RETRY) {
            await delay(2000);
            return await schedulerWithRetry(name, retry + 1);
        }
        else{
            console.log("Max Limit reached");
        }
    }
}

const fetchingAndUpdating = async(name)=>{
    try {
        const resFromAPI = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${name}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`);
        const response = resFromAPI.data;
        if(!response){
            throw new Error("error from getting data from external api");
        }
        console.log(response);
        const resFromDB = await currencySchema.create({name, price:response[name].usd, marketCap:response[name].usd_market_cap, change24h:response[name].usd_24h_change});
        if(!resFromDB){
            throw new Error("error in stroring data");
        }
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}

export const schedulerFunction = async () =>{
    
    cron.schedule('*/2 * * * *', async () => {
        console.log('Fetching cryptocurrency data...');
        try {
            const promises = coins.map((coin)=> schedulerWithRetry(coin));
            await Promise.all(promises);
          console.log('Cryptocurrency data fetched successfully.');
        } catch (error) {
          console.error('Error fetching cryptocurrency data:', error);
        }
    });
};

