import { DateTime } from 'luxon';
import { IReturnChartDataOptions } from '../../interfaces/models';
import { stop } from '../http-queue.service';
import { publicApi } from '../public';
// import { IReturnChartDataOptions } from '../../interfaces/models';

// import * as moment from 'moment';


describe('should show public data from poloniex', () => {
    afterAll(async () =>{
        stop()
    })

    test('should be test returnOrderBook', async () => {
        const ordersBook = await publicApi.returnOrderBook('BTC_LTC');
        expect(ordersBook).toHaveProperty('asks')
        expect(ordersBook.asks).toHaveProperty('length')
        expect(ordersBook.asks.length).toBeGreaterThan(0)

        expect(ordersBook).toHaveProperty('bids')
        expect(ordersBook.bids).toHaveProperty('length')
        expect(ordersBook.bids.length).toBeGreaterThan(0)
    });

    test('should be test returnChartData', async () => {
        const opt: IReturnChartDataOptions = {
            currencyPair: 'BTC_LSK', 
            start: DateTime.utc().minus({minutes: 30}).toJSDate(), 
            period: "5m"
        }
        const candles = await publicApi.returnChartData(opt);
        expect(candles).toHaveProperty('length')
        expect(candles.length).toBeGreaterThan(0)
    });

    test('should be show public return24hVolume info', async () => {
        const volume = await publicApi.return24hVolume();
        expect(volume.rawVolumes).toHaveProperty('length')
        expect(volume.rawVolumes.length).toBeGreaterThan(0)
        expect(volume.exchangeVolumes).toHaveProperty('length')
        expect(volume.exchangeVolumes.length).toBeGreaterThan(0)
    });

    test('should be test returnLoanOrders', async () => {
        const loanOrders = await publicApi.returnLoanOrders('LTC');
        expect(loanOrders).toHaveProperty('demands')
        expect(loanOrders.demands).toHaveProperty('length')
        expect(loanOrders).toHaveProperty('offers')
        expect(loanOrders.offers).toHaveProperty('length')
    });

    test('should be test returnTicker', async () => {
        const tickers = await publicApi.returnTickers();
        expect(tickers).toHaveProperty('length')
        expect(tickers.length).toBeGreaterThan(0)
        expect(tickers[0].last).not.toBeNaN()
        console.log(tickers);
    });
});
