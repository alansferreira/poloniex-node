import env from '../../utils/env'
import { PrivateApi } from '../private';
import { IReturnTradeHistoryOptions } from '../../interfaces/models';

import { DateTime } from 'luxon';
import { stop } from '../http-queue.service';

const _key = env.POLONIEX_KEY;
const _secret = env.POLONIEX_SECRET;

const poloniex = new PrivateApi(_key, _secret);


describe('should show private data from poloniex', function(){
    afterAll(async () => {
        stop()
    })
    test('should be show all trades history, if have', async () => {
        const opt: IReturnTradeHistoryOptions = {start: DateTime.now().minus({years: 4}).toJSDate()};
        
        const allHistory = await poloniex.returnTradeHistory(opt);
        expect(allHistory).toHaveProperty('length')
        expect(allHistory.length).toBeGreaterThan(0)
    });
    test('should be show single trade history, if have', async () => {
        const opt: IReturnTradeHistoryOptions = {
            start: DateTime.now().minus({years: 4}).toJSDate(),
            currencyPair: "BTC_DOGE"
        };
        
        const trades = await poloniex.returnTradeHistory(opt);
        expect(trades).toHaveProperty('length')
        expect(trades.length).toBeGreaterThan(0)
    });

    test('should be show trade fee info', async () => {
        const {
            makerFee,
            takerFee,
            marginMakerFee,
            marginTakerFee,
            thirtyDayVolume,
            nextTier,
        } = await poloniex.returnFeeInfo();
       
        expect(typeof makerFee).toEqual('number')
        expect(typeof takerFee).toEqual('number')
        expect(typeof marginMakerFee).toEqual('number')
        expect(typeof marginTakerFee).toEqual('number')
        expect(typeof thirtyDayVolume).toEqual('number')
        expect(typeof nextTier).toEqual('number')
        
        
    });

    test('should be show private wallets with balances', async () => {
        const balances = await poloniex.returnBalances(true);
        expect(balances).toHaveProperty('length');
        expect(balances.length).toBeGreaterThan(0);
        expect(balances.find(b => b.available===0)).toBeUndefined()
        expect(balances.find(b => b.available!==0)).not.toBeUndefined()
    });

    test('should be show all private wallets with and without balances', async () => {
        const balances = await poloniex.returnBalances(false);
        expect(balances).toHaveProperty('length');
        expect(balances.length).toBeGreaterThan(0);
        expect(balances.find(b => b.available===0)).not.toBeUndefined()
        expect(balances.find(b => b.available!==0)).not.toBeUndefined()
    });

    test('should be show private complete balances only with values', async () => {
        const balances = await poloniex.returnCompleteBalances(true);
        expect(balances).toHaveProperty('length');
        expect(balances.length).toBeGreaterThan(0);
        expect(balances.find(b => b.btcValue + b.available === 0 )).toBeUndefined()
        expect(balances.find(b => b.btcValue + b.available !== 0 )).not.toBeUndefined()
    });
    test('should be show private complete all balances with and without values', async () => {
        const balances = await poloniex.returnCompleteBalances(false);
        expect(balances).toHaveProperty('length');
        expect(balances.length).toBeGreaterThan(0);
        expect(balances.find(b => b.btcValue + b.available === 0 )).not.toBeUndefined()
        expect(balances.find(b => b.btcValue + b.available !== 0 )).not.toBeUndefined()

    });

    test('should be show all private openned orders, if have', async () => {
        const orders = await poloniex.returnOpenOrders();
        expect(orders).toHaveProperty('length')
        expect(orders.length).toEqual(0)
    });

    test('should be show BTC_XCP private openned orders, if have', async () => {
        const orders = await poloniex.returnOpenOrders('USDT_BTC');
        expect(orders).toHaveProperty('length')
        expect(orders.length).toEqual(0)
    });
    
    // it.todo('should be test buy', async () => {
    //     // poloniex
    //     // .buy({currencyPair: 'BTC_LTC', amount: 0.5, rate: 0.00125248})
    //     // .then((order)=>{
        
    //     //     console.log(order);
        
    //     //     poloniex
    //     //     .cancelOrder(order.orderNumber)
    //     //     .then((cancelOrderResult)=>{
                
    //     //         console.log(cancelOrderResult);
    //     //         assert(cancelOrderResult.success);

    //     //         done();
    //     //     })
    //     //     .catch((error)=>{
    //     //         console.log(error);
    //     //         assert(false);

    //     //         done();
    //     //     });
    //     // })
    //     // .catch((error)=>{
    //     //     console.log(error);
    //     //     assert(false);

    //     //     done();
    //     // });
    // });

    // it.todo('should be test moveOrder', async () => {

    //     // poloniex
    //     // .buy({currencyPair: 'BTC_LTC', amount: 0.5, rate: 0.00115248})
    //     // .then((order)=>{
    //     //     console.log(order);
    //     //     return poloniex.moveOrder(order.orderNumber, 0.00125248)
    //     // })
    //     // .then((movedOrder)=>{
    //     //     console.log(movedOrder);
    //     //     return poloniex.cancelOrder(movedOrder.orderNumber)
    //     // })
    //     // .then((cancelOrderResult)=>{
            
    //     //     console.log(cancelOrderResult);
    //     //     assert(cancelOrderResult.success);

    //     //     done();
    //     // })
    //     // .catch((error)=>{
    //     //     console.log(error);
    //     //     assert(false);

    //     //     done();
    //     // });
    // });

    // it.todo('should be test sell', async () => {
    //     // poloniex
    //     // .sell({currencyPair: 'BTC_LTC', amount: 1, rate: 0.03})
    //     // .then((order)=>{
    //     //     console.log(order);
            
    //     //     poloniex
    //     //     .cancelOrder(order.orderNumber)
    //     //     .then((cancelOrderResult)=>{
                
    //     //         console.log(cancelOrderResult);
    //     //         assert(cancelOrderResult.success);

    //     //         done();
    //     //     })
    //     //     .catch((error)=>{
    //     //         console.log(error);
    //     //         assert(false);

    //     //         done();
    //     //     });
    //     // })
    //     // .catch((error)=>{
    //     //     console.log(error);
    //     //     assert(false);

    //     //     done();
    //     // });
    // });

    
});