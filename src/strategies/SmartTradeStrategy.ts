// import { PoloniexApi } from '../poloniex/poloniex.service';
// import moment = require('moment');
// import { ITrade, ITicker, IBalance } from '../interfaces/models';



// export class SmartTradeStrategy {

//     constructor(private api: PoloniexApi){
        
//     }

//     async getLastTrade(currencyPair: string, type: 'sell' | 'buy'): Promise<ITrade>{
//         const lastTrades = await this.api.returnTradeHistory({currencyPair: currencyPair, start: moment().subtract(3, "months").toDate()});
//         for (let t = lastTrades.length - 1; t > -1; t--) {
//             const trade = lastTrades[t];
//             if(trade.type != type) continue;
//             return trade;
//         }
    
//     }
//     async getTicker(currencyPair: string): Promise<ITicker>{
//         const tickers = await this.api.returnTickers();
//         return tickers.filter(t => t.name == currencyPair)[0];
    
//     }
//     async getBalance(currencyPair: string): Promise<IBalance>{
//         const balances = await this.api.returnBalances();
//         if(!balances || !balances.length) return null;
    
//         return balances.filter(b => b.name == currencyPair)[0];
    
//     }
    
//     async getRankingVolume(rootCurrencies: string[] = ['BTC', 'ETH', 'ETC', 'BCH']): Promise<ITicker[]>{
//         const tickers = await this.api.returnTickers();
//         return tickers
//         .filter(t => rootCurrencies.indexOf(t.name.substring(0, t.name.indexOf('_'))) > -1)
//         .filter(t => t.baseVolume > 20)
//         .sort((a,b)=> {
//             if(a.baseVolume < b.baseVolume) return 1;
//             if(a.baseVolume > b.baseVolume) return -1;
//             return 0;
//         })
//         .sort((a,b)=> {
//             if(a.last > b.last) return 1;
//             if(a.last < b.last) return -1;
//             return 0;
//         })
//         ;
//     }   
// }

// // const api = new PoloniexApi("", "");

// // const currencyPair = 'BTC_BCN';
// // const rootCurrencies = ['BTC', 'ETH', 'ETC', 'BCH'];





// // async function checkForSell(){
// //     try {
// //         const fee = await api.returnFeeInfo();
// //         const tickers = await getRankingVolume();

// //         const lastBuyTrade = await getLastTrade(currencyPair, 'buy');
// //         const ticker = await getTicker(currencyPair);

// //         const balance = await getBalance(currencyPair);
// //         if(!balance) return;

// //         const buyRate = lastBuyTrade.rate;
// //         // const sellRate = (ticker.last + spread);
// //         // const buyGrossValue = (balance.btcValue / ticker.last);
// //         // const buyNetValue = balance.available; // (buyGrossValue - (buyGrossValue * accountInfo.fee.takerFee));

// //         const sellGrossValue = (balance.available * ticker.last);
// //         const sellNetValue = (sellGrossValue - (sellGrossValue * fee.takerFee));

// //         const expectedProfit = sellNetValue - balance.available;

// //         console.log(`last buyed ${currencyPair}: ${lastBuyTrade.amount} at value ${lastBuyTrade.rate.toFixed(8)}`);
// //         console.log(`last price ${currencyPair}: ${ticker.last.toFixed(8)}`);
// //         console.log(`estimated profit: ${expectedProfit.toFixed(8)}`);
// //         // console.log(ticker);

// //     } catch (error) {
// //         console.error(error.error);
// //     }

// // }



// // async function start(){
// //     try {
// //         setInterval(checkForSell, 1000);
        
// //     } catch (error) {
// //         console.error(error.error);
// //         process.exit();
// //     }
// // }

// // start();


// // const buyRate = bid.hightest;
// // const sellRate = (pair.last + spread);
// // const buyGrossValue = (accountInfo.BTC_TRADE_AMOUNT / bid.hightest);
// // const buyNetValue = (buyGrossValue - (buyGrossValue * accountInfo.fee.takerFee));

// // const sellGrossValue = (buyNetValue * sellRate);
// // const sellNetValue = (sellGrossValue - (sellGrossValue * accountInfo.fee.takerFee));

// // const expectedProfit = sellNetValue - accountInfo.BTC_TRADE_AMOUNT;
