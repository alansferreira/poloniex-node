/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IFeeInfoResult,
  IOpennedOrder,
  IOrderResult,
  IBalance,
  // IVolume24h,
  // IChartCandle,
  // IOrderBook,
  // ILoanOrder,
  // ITicker,
  ITrade,
  IReturnTradeHistoryOptions,
  // IReturnChartDataOptions,
} from '../interfaces/models';
// import * as moment from "moment";
// import { DateTime } from "luxon";
// import * as httpService from './http-queue.service';
// import { RequestGetQueue } from './http-queue.service';

export class PrivateApi {
  constructor(private apiKey: string, private secretKey: string) {
    console.log(this.apiKey.slice(0, 5));
    console.log(this.secretKey.slice(0, 5));
  }

  async returnTradeHistory(
    _options: IReturnTradeHistoryOptions,
  ): Promise<ITrade[]> {
    throw new Error('returnTradeHistory not implemented');
  }
  // async returnTradeHistory(options: IReturnTradeHistoryOptions): Promise<ITrade[]> {
  //     try {
  //         const data: any = Object.assign({ command: 'returnTradeHistory', currencyPair: 'all' }, options);
  //         if (options.start) { data.start = options.start.getTime() / 1000 };
  //         if (options.end) { data.end = options.end.getTime() / 1000 };

  //         const reqOptions = new RequestPostQueue(this.apiKey, this.secretKey, data);

  //         const tradeHistory = (await httpService.enqueue(reqOptions)).result;

  //         if (options.currencyPair) {
  //             const trades = tradeHistory.map((tr)=>{return Object.assign(new Trade(tr), { currencyPair: options.currencyPair });})
  //             return trades;
  //         }

  //         let arr = [];
  //         for (const coinName in tradeHistory) {
  //             if (!tradeHistory.hasOwnProperty(coinName)) continue;
  //             if (!tradeHistory[coinName] || !tradeHistory[coinName].length) continue;

  //             const trades = tradeHistory[coinName].map((tr)=>{
  //                 return Object.assign(new Trade(tr), { currencyPair: coinName });
  //             });

  //             arr = arr.concat(trades);

  //         }

  //         return arr;

  //     } catch (error) {
  //         console.error(error);
  //         throw error;
  //     }
  // }

  async returnFeeInfo(): Promise<IFeeInfoResult> {
    throw new Error('returnFeeInfo not implemented');
  }
  // async returnFeeInfo(): Promise<IFeeInfoResult>{
  //     try {
  //         const reqOptions = new RequestPostQueue(this.apiKey, this.secretKey, { command: 'returnFeeInfo' });
  //         const feeInfo = (await httpService.enqueue(reqOptions)).result;

  //         return feeInfo;

  //     } catch (error) {
  //         console.error(error);
  //         throw error;
  //     }
  // }

  async returnBalances(_onlyWithAmount?: boolean): Promise<IBalance[]> {
    throw new Error('returnBalances not implemented');
  }
  // async returnBalances(onlyWithAmount?: boolean) : Promise<IBalance[]>{
  //     try {
  //         const reqOptions = new RequestPostQueue(this.apiKey, this.secretKey, { command: 'returnBalances' });
  //         const balances = (await httpService.enqueue(reqOptions)).result;

  //         const arr = [];
  //         for (const coinName in balances) {
  //             if (!balances.hasOwnProperty(coinName)) continue;
  //             if (onlyWithAmount && !Number(balances[coinName])) continue;
  //             arr.push({ name: coinName, available: Number(balances[coinName]) });
  //         }

  //         return arr;

  //     } catch (error) {
  //         console.error(error);
  //         throw error;
  //     }
  // };

  async returnOpenOrders(_currencyPair?: string): Promise<IOpennedOrder[]> {
    throw new Error('returnOpenOrders not implemented');
  }
  // async returnOpenOrders(currencyPair?: string): Promise<IOpennedOrder[]> {

  //     try {

  //         const reqOptions = new RequestPostQueue(this.apiKey, this.secretKey, { command: 'returnOpenOrders', currencyPair: (currencyPair ? currencyPair : 'all') });
  //         const openedOrders = (await httpService.enqueue(reqOptions)).result;

  //         if (currencyPair) {
  //             const orders = openedOrders.map((o)=>{return new OpennedOrder(Object.assign(o, { currencyPair: currencyPair }));})
  //             return orders;
  //         }

  //         let arr = [];
  //         for (const coinName in openedOrders) {
  //             if (!openedOrders.hasOwnProperty(coinName)) continue;
  //             if (!openedOrders[coinName] || !openedOrders[coinName].length) continue;

  //             const parsedOpenOrders = openedOrders[coinName].map((o)=>{
  //                 return new OpennedOrder(Object.assign(o, { currencyPair: coinName }));
  //             });

  //             arr = arr.concat(parsedOpenOrders);
  //         }

  //         return arr;
  //     } catch (error) {
  //         console.error(error);
  //         throw error;
  //     }
  // }

  async moveOrder(_orderNumber: number, _rate: number): Promise<IOpennedOrder> {
    throw new Error('moveOrder not implemented');
  }
  // async moveOrder(orderNumber: number, rate: number): Promise<IOpennedOrder> {
  //     const reqOptions = new RequestPostQueue(this.apiKey, this.secretKey, { command: 'moveOrder', orderNumber: orderNumber, rate: rate });

  //     return (await httpService.enqueue(reqOptions)).result;
  // };

  async buy(_order): Promise<IOrderResult> {
    throw new Error('buy not implemented');
  }
  // async buy(order): Promise<IOrderResult>{
  //     try {
  //         const reqOptions = new RequestPostQueue(this.apiKey, this.secretKey, Object.assign({ command: 'buy' }, order));
  //         const orderResult = (await httpService.enqueue(reqOptions)).result;

  //         return orderResult;
  //     } catch (error) {
  //         console.error(error);
  //         throw error;
  //     }
  // }

  async cancelOrder(_orderNumber: number): Promise<{ success: boolean }> {
    throw new Error('cancelOrder not implemented');
  }
  // async cancelOrder(orderNumber: number): Promise<{success: boolean}> {

  //     try {

  //         const reqOptions = new RequestPostQueue(this.apiKey, this.secretKey, { command: 'cancelOrder', orderNumber: orderNumber });
  //         const orderResult = (await httpService.enqueue(reqOptions)).result;

  //         return orderResult;
  //     } catch (error) {
  //         console.error(error);
  //         throw error;
  //     }
  // }

  async sell(_order): Promise<IOrderResult> {
    throw new Error('sell not implemented');
  }
  // async sell(order): Promise<IOrderResult> {
  //     try {

  //         const reqOptions = new RequestPostQueue(this.apiKey, this.secretKey, Object.assign({ command: 'sell' }, order));
  //         const orderResult = (await httpService.enqueue(reqOptions)).result;

  //         return orderResult;
  //     } catch (error) {
  //         console.error(error);
  //         throw error;
  //     }
  // }

  async returnCompleteBalances(_account, _onlyWithAmount): Promise<IBalance[]> {
    throw new Error('returnCompleteBalances not implemented');
  }
  // async returnCompleteBalances(account, onlyWithAmount): Promise<IBalance[]> {
  //     try {

  //         const reqOptions = new RequestPostQueue(this.apiKey, this.secretKey, { command: 'returnCompleteBalances', account: account ? account : 'all' });
  //         const balances = (await httpService.enqueue(reqOptions)).result;

  //         const arr = [];
  //         for (const coinName in balances) {
  //             if (!balances.hasOwnProperty(coinName)) continue;
  //             if (onlyWithAmount && !Number(balances[coinName].available) && !Number(balances[coinName].onOrders)) continue;

  //             arr.push(Object.assign(new Balance(balances[coinName]), {name: coinName}));
  //         }

  //         return arr;

  //     } catch (error) {
  //         console.error(error);
  //         throw error;
  //     }
  // }
}
