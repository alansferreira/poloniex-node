/* eslint-disable @typescript-eslint/no-unused-vars */
import { DateTime } from 'luxon';
import {
  IFeeInfo,
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
import { RequestPostQueue, enqueue } from './http-queue.service';
// import * as moment from "moment";
// import { DateTime } from "luxon";
// import * as httpService from './http-queue.service';
// import { RequestGetQueue } from './http-queue.service';

interface ITradeHistoryAll {[currenciPair:string]: ITrade[]}

interface IFeeInfoRaw {
  makerFee: string
  takerFee: string
  marginMakerFee: string
  marginTakerFee: string
  thirtyDayVolume: string
  nextTier: number
}
export interface IBalanceRaw {
  available: string;
  onOrders: string;
  btcValue: string;
}
export interface IOpennedOrderRaw {
  orderNumber: string;
  type: 'buy' | 'sell';
  rate: string;
  amount: string;
  total: string;
  margin: string;
  date: string;
}

export class PrivateApi {
  constructor(private apiKey: string, private secretKey: string) {
    console.log(this.apiKey.slice(0, 5));
    console.log(this.secretKey.slice(0, 5));
  }

  async returnTradeHistory(options: IReturnTradeHistoryOptions): Promise<ITrade[]> {
      try {
          const data = { 
            command: 'returnTradeHistory', 
            currencyPair: options.currencyPair || 'all', 
            start: options.start ? options.start.getTime() / 1000 : undefined,
            end: options.end ? options.end.getTime() / 1000 : DateTime.utc().toMillis() / 1000
          };

          const reqOptions = new RequestPostQueue(this.apiKey, this.secretKey, data);

          if (options.currencyPair) {
            const { result } = (await enqueue<ITrade[]>(reqOptions));
            return result.map((tr)=>{ return {...tr,  currencyPair: options.currencyPair } })
          }

          const { result } = (await enqueue<ITradeHistoryAll>(reqOptions));

          let arr = [];
          for (const coinName in result) {
            if (!Object.prototype.hasOwnProperty.call(result, coinName)) continue
            if (!result[coinName]?.length) continue;

            const trades = result[coinName].map((tr)=>{
                return {...tr, currencyPair: coinName }
            });
            arr = arr.concat(trades);
          }

          return arr;

      } catch (error) {
          console.error(error);
          throw error;
      }
  }

  async returnFeeInfo(): Promise<IFeeInfo>{
      try {
          const reqOptions = new RequestPostQueue(this.apiKey, this.secretKey, { command: 'returnFeeInfo' });
          const { result } = (await enqueue<IFeeInfoRaw>(reqOptions));
          const {
            makerFee,
            takerFee,
            marginMakerFee,
            marginTakerFee,
            thirtyDayVolume,
            nextTier,
          } = result

          return {
            makerFee: parseFloat(makerFee),
            takerFee: parseFloat(takerFee),
            marginMakerFee: parseFloat(marginMakerFee),
            marginTakerFee: parseFloat(marginTakerFee),
            thirtyDayVolume: parseFloat(thirtyDayVolume),
            nextTier
          };

      } catch (error) {
          console.error(error);
          throw error;
      }
  }

  async returnBalances(onlyWithAmount?: boolean) : Promise<IBalance[]>{
      try {
          const reqOptions = new RequestPostQueue(this.apiKey, this.secretKey, { command: 'returnBalances' });
          const { result } = (await enqueue<{[currencyName: string]: string}>(reqOptions));

          const arr = [];
          for (const coinName in result) {
            if (!Object.prototype.hasOwnProperty.call(result, coinName)) continue
            
            const available = parseFloat(result[coinName])
            if (onlyWithAmount && available === 0) continue;
            arr.push({ name: coinName, available });
          }

          return arr;

      } catch (error) {
          console.error(error);
          throw error;
      }
  };

  async returnOpenOrders(currencyPair?: string): Promise<IOpennedOrder[]> {

      try {

          const reqOptions = new RequestPostQueue(this.apiKey, this.secretKey, { command: 'returnOpenOrders', currencyPair: (currencyPair ? currencyPair : 'all') });

          if (currencyPair) {
            const { result } = (await enqueue<IOpennedOrderRaw[]>(reqOptions));
            return result.map((o)=>{
              return {
                currencyPair: currencyPair,
                orderNumber: parseFloat(o.orderNumber),
                type: o.type,
                rate: parseFloat(o.rate),
                amount: parseFloat(o.amount),
                total: parseFloat(o.total),
                margin: parseFloat(o.margin),
                date: new Date(parseFloat(o.date) * 1000),
              };
            })
          }

          const { result } = (await enqueue<{[currencyPair: string]: IOpennedOrderRaw[]}>(reqOptions));

          let arr = [];
          for (const currencyPair in result) {
            if (!Object.prototype.hasOwnProperty.call(currencyPair)) continue;
            const openedList = result[currencyPair]
            if (!openedList?.length) continue;

            const parsedOpenOrders = openedList.map((o)=>{
              return {
                currencyPair: currencyPair,
                orderNumber: parseFloat(o.orderNumber),
                type: o.type,
                rate: parseFloat(o.rate),
                amount: parseFloat(o.amount),
                total: parseFloat(o.total),
                margin: parseFloat(o.margin),
                date: new Date(parseFloat(o.date) * 1000),
              };
            });

            arr = arr.concat(parsedOpenOrders);
          }

          return arr;
      } catch (error) {
          console.error(error);
          throw error;
      }
  }

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


  async returnCompleteBalances(onlyWithAmount?: boolean): Promise<IBalance[]> {
    try {

      const reqOptions = new RequestPostQueue(this.apiKey, this.secretKey, { command: 'returnCompleteBalances', account: 'all' });
      const { result } = (await enqueue<{[currencyName: string]: IBalanceRaw}>(reqOptions));

      const arr = [];
      for (const coinName in result) {
        if (!Object.prototype.hasOwnProperty.call(result, coinName)) continue
        const balance = result[coinName]
        const available = parseFloat(balance.available)
        const onOrders = parseFloat(balance.onOrders)

        if (onlyWithAmount && available===0 && onOrders === 0) continue;
        const btcValue = parseFloat(balance.btcValue)

        arr.push({
          currencyName: coinName,
          available,
          onOrders,
          btcValue,
        });
      }

      return arr;

    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
