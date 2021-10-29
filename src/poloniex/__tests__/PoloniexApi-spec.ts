// import { PoloniexApi } from '../poloniex.service';
// import { IReturnChartDataOptions, IReturnTradeHistoryOptions } from '../../interfaces/models';

// import * as moment from 'moment';
// const _key = "";
// const _secret = "";

// const  poloniex = new PoloniexApi(_key, _secret);

// describe('should show public data from poloniex', () => {
    
//     it.todo('should be test returnOrderBook', async () => {
//         const ordersBook = await poloniex.returnOrderBook('BTC_LTC');
//         console.log(ordersBook);
//     });

//     it.todo('should be test returnChartData', async () => {
//         const opt: IReturnChartDataOptions = {
//             currencyPair: 'BTC_LSK', start: moment.utc().subtract(30, 'minutes').toDate(), period: "5m"
//         }
//         const candles = await poloniex.returnChartData(opt);
//         console.log(candles);
//     });

//     it.todo('should be show public return24hVolume info', async () => {
//         const volume = await poloniex.return24hVolume();
//         console.log(volume);
//     });

//     it.todo('should be test returnLoanOrders', async () => {
//         const loanOrders = await poloniex.returnLoanOrders('LTC');
//         console.log(loanOrders);
//     });

//     it.todo('should be test returnTicker', async () => {
//         const tickers = await poloniex.returnTickers();
//         console.log(tickers);
//     });
// });

// describe('should show private data from poloniex', function(){
    
//     it.todo('should be show trade history private, if have', async () => {
//         const opt: IReturnTradeHistoryOptions = {start: moment().subtract(1, 'day').toDate()};
        
//         const trades = await poloniex.returnTradeHistory(opt);
//         console.log(trades);
//     });

//     it.todo('should be show trade fee info', async () => {
//         const feeInfo = await poloniex.returnFeeInfo();
//         console.log(feeInfo);
//     });

//     it.todo('should be show private wallets with balances', async () => {
//         const balances = await poloniex.returnBalances(true);
//         console.log(balances);

//     });

//     it.todo('should be show all private wallets with and without balances', async () => {
//         const balances = await poloniex.returnBalances(false);
//         console.log(balances);

//     });

//     it.todo('should be show private complete balances only with values', async () => {
//         const balances = await poloniex.returnCompleteBalances(undefined, true);
//         console.log(balances);

//     });
//     it.todo('should be show private complete all balances with and without values', async () => {
//         const balances = await poloniex.returnCompleteBalances(undefined, false);
//         console.log(balances);

//     });

//     it.todo('should be show all private openned orders, if have', async () => {
//         const orders = await poloniex.returnOpenOrders();
//         console.log(orders);
//     });

//     it.todo('should be show BTC_XCP private openned orders, if have', async () => {
//         const orders = await poloniex.returnOpenOrders('BTC_XCP');
//         console.log(orders);
//     });
    
//     it.todo('should be test buy', async () => {
//         // poloniex
//         // .buy({currencyPair: 'BTC_LTC', amount: 0.5, rate: 0.00125248})
//         // .then((order)=>{
        
//         //     console.log(order);
        
//         //     poloniex
//         //     .cancelOrder(order.orderNumber)
//         //     .then((cancelOrderResult)=>{
                
//         //         console.log(cancelOrderResult);
//         //         assert(cancelOrderResult.success);

//         //         done();
//         //     })
//         //     .catch((error)=>{
//         //         console.log(error);
//         //         assert(false);

//         //         done();
//         //     });
//         // })
//         // .catch((error)=>{
//         //     console.log(error);
//         //     assert(false);

//         //     done();
//         // });
//     });

//     it.todo('should be test moveOrder', async () => {

//         // poloniex
//         // .buy({currencyPair: 'BTC_LTC', amount: 0.5, rate: 0.00115248})
//         // .then((order)=>{
//         //     console.log(order);
//         //     return poloniex.moveOrder(order.orderNumber, 0.00125248)
//         // })
//         // .then((movedOrder)=>{
//         //     console.log(movedOrder);
//         //     return poloniex.cancelOrder(movedOrder.orderNumber)
//         // })
//         // .then((cancelOrderResult)=>{
            
//         //     console.log(cancelOrderResult);
//         //     assert(cancelOrderResult.success);

//         //     done();
//         // })
//         // .catch((error)=>{
//         //     console.log(error);
//         //     assert(false);

//         //     done();
//         // });
//     });

//     it.todo('should be test sell', async () => {
//         // poloniex
//         // .sell({currencyPair: 'BTC_LTC', amount: 1, rate: 0.03})
//         // .then((order)=>{
//         //     console.log(order);
            
//         //     poloniex
//         //     .cancelOrder(order.orderNumber)
//         //     .then((cancelOrderResult)=>{
                
//         //         console.log(cancelOrderResult);
//         //         assert(cancelOrderResult.success);

//         //         done();
//         //     })
//         //     .catch((error)=>{
//         //         console.log(error);
//         //         assert(false);

//         //         done();
//         //     });
//         // })
//         // .catch((error)=>{
//         //     console.log(error);
//         //     assert(false);

//         //     done();
//         // });
//     });

    
// });