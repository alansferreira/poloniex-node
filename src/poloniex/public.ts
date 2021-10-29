/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  // IFeeInfoResult,
  // IOpennedOrder,
  // IOrderResult,
  // IBalance,
  IVolume24h,
  IChartCandle,
  IOrderBook,
  ILoanOrder,
  ITicker,
  // ITrade,
  // IReturnTradeHistoryOptions,
  IReturnChartDataOptions,
} from '../interfaces/models';
// import * as moment from "moment";
import { DateTime } from "luxon";
import * as httpService from './http-queue.service';
import { RequestGetQueue } from './http-queue.service';

class PublicApi {
  /**
   * Call: https://poloniex.com/public?command=return24hVolume
   *
   * Returns the 24-hour volume for all markets, plus totals for primary currencies. Sample output:
   * {"BTC_LTC":{"BTC":"2.23248854","LTC":"87.10381314"},"BTC_NXT":{"BTC":"0.981616","NXT":"14145"}, ... "totalBTC":"81.89657704","totalLTC":"78.52083806"}
   *
   */
  async return24hVolume(): Promise<IVolume24h> {
      try {
          const reqOptions = new RequestGetQueue(`https://poloniex.com/public?command=return24hVolume`)
          const jsonData = (await httpService.enqueue<{[x:string]: never}>(reqOptions)).result;

          const result: IVolume24h = {rawVolumes: [], exchangeVolumes: []};
          for (const tickerName in jsonData) {
            if (Object.prototype.hasOwnProperty.call(jsonData, tickerName)) {
              if(tickerName.startsWith('total')){
                result.rawVolumes.push({
                  currencyName: tickerName.substring(5), 
                  total: parseFloat(jsonData[tickerName])
                })
              } else {
                const names = tickerName.split('_')
                result.exchangeVolumes.push({
                  currencyName: tickerName,
                  exchanged: parseFloat(jsonData[tickerName][names[0]]),
                  raw: parseFloat(jsonData[tickerName][names[1]])
                })
              }
            }
          }
          return result;

      } catch (error) {
          console.error(error);
          throw error;
      }
  }

  /**
   * call´s the https://poloniex.com/public?command=returnChartData
   * Returns candlestick chart data.
   * Required GET parameters are "currencyPair", "period"
   * (candlestick period in seconds; valid values are 300, 900 30m, 1800 1h, 7200 2h, 14400 4h, and 86400), "start", and "end". "Start" and "end" are given in UNIX timestamp format and used to specify the date range for the data returned.
   *   Sample output:
   *      [{"date":1405699200,"high":0.0045388,"low":0.00403001,"open":0.00404545,"close":0.00427592,"volume":44.11655644,"quoteVolume":10259.29079097,"weightedAverage":0.00430015}, ...]
   *
   * @param {returnChartDataOptions} _options
   * @return {Promise<IChartCandle[]>}
   */
  async returnChartData(options: IReturnChartDataOptions): Promise<IChartCandle[]> {
      try {
          const periodMap = {
              '5m': 300,
              '30m': 900,
              '1h': 1800,
              '2h': 7200,
              '4h': 14400,
              '24h': 86400
          };
          const period = periodMap[options.period] || 1800;

          const op = {
            period: 14400, 
            end: new Date(9999999999 * 1000),
            ...options
          }
          const url = `https://poloniex.com/public?command=returnChartData&currencyPair=${op.currencyPair}&start=${op.start.getTime() / 1000}&end=${op.end.getTime() / 1000}&period=${period}`;

          const reqOptions = new RequestGetQueue(url)
          const { result } = (await httpService.enqueue<[{
            date: string,
            high: string,
            low: string,
            open: string,
            close: string,
            volume: string,
            quoteVolume: string,
            weightedAverage: string,
          }]>(reqOptions));

          return result.map(({
            date,
            high,
            low,
            open,
            close,
            volume,
            quoteVolume,
            weightedAverage,
          })=>{
              return {
                currencyPair: op.currencyPair,
                date: new Date(parseFloat(date) * 1000),
                high: parseFloat(high),
                low: parseFloat(low),
                open: parseFloat(open),
                close: parseFloat(close),
                volume: parseFloat(volume),
                quoteVolume: parseFloat(quoteVolume),
                weightedAverage: parseFloat(weightedAverage),
              };
          });
      } catch (error) {
          console.error(error);
          throw error;
      }

  }

  /**
   * call´s https://poloniex.com/public?command=returnOrderBook
   * Returns the order book for a given market, as well as a sequence number for use with the Push API and an indicator specifying whether the market is frozen. You may set currencyPair to "all" to get the order books of all markets. Sample output:
   *
   * {"asks":[[0.00007600,1164],[0.00007620,1300], ... ], "bids":[[0.00006901,200],[0.00006900,408], ... ], "isFrozen": 0, "seq": 18849}
   *
   * Or, for all markets:
   *
   * {"BTC_NXT":{"asks":[[0.00007600,1164],[0.00007620,1300], ... ], "bids":[[0.00006901,200],[0.00006900,408], ... ], "isFrozen": 0, "seq": 149},"BTC_XMR":...}
   * @param {string} _currencyPair omit for 'all'
   * @return {Promise<IOrderBook>}
   */
  async returnOrderBook(currencyPair: string): Promise<IOrderBook> {
      try {
          const url = `https://poloniex.com/public?command=returnOrderBook&currencyPair=${(currencyPair ? currencyPair : 'all')}`;
          const reqOptions = new RequestGetQueue(url)
          const { result } = (
            await httpService.enqueue<{
              isFrozen: string,
              seq: string,
              postOnly: string,
              asks: [string[]],
              bids: [string[]]
            }>(reqOptions)
          )

          const {
            isFrozen,
            seq,
            postOnly,
            asks,
            bids
          } = result;
          // const { result } = (await httpService.enqueue<{
          //   isFozen: string,
          //   seq: string,
          //   postOnly: string,
          //   asks: [[]],
          //   bids: [[]]
          // }>(reqOptions));

          return {
            currencyName: currencyPair,
            isFrozen: isFrozen === '1',
            seq: parseFloat(seq),
            postOnly: postOnly === '1',
            asks: asks.map(a => {return {rate: parseFloat(a[0]), amount: parseFloat(a[1])}}),
            bids: bids.map(b => {return {rate: parseFloat(b[0]), amount: parseFloat(b[1])}}),
          };
      } catch (error) {
          console.error(error);
          throw error;
      }
  }

  /**
   * call´s https://poloniex.com/public?command=returnLoanOrders&currency=${tickerName}
   * Returns the list of loan offers and demands for a given currency, specified by the "currency" GET parameter.
   * Sample output:
   *      {"offers":[{"rate":"0.00200000","amount":"64.66305732","rangeMin":2,"rangeMax":8}, ... ],"demands":[{"rate":"0.00170000","amount":"26.54848841","rangeMin":2,"rangeMax":2}, ... ]}
   * @param {string} _tickerName  currency name
   * @return {Promise<ILoanOrder>}
   */
  async returnLoanOrders(tickerName): Promise<ILoanOrder> {
      try {
          const url = `https://poloniex.com/public?command=returnLoanOrders&currency=${tickerName}`;
          const reqOptions = new RequestGetQueue(url)
          const jsonData = (await httpService.enqueue<ILoanOrder>(reqOptions)).result;

          return {...jsonData, currencyName: tickerName};
      } catch (error) {
          console.error(error);
          throw error;
      }
  }

  /**
   * call´s https://poloniex.com/public?command=returnTicker
   * Returns the 24-hour volume for all markets, plus totals for primary currencies. Sample output:
   *      {"BTC_LTC":{"BTC":"2.23248854","LTC":"87.10381314"},"BTC_NXT":{"BTC":"0.981616","NXT":"14145"}, ... "totalBTC":"81.89657704","totalLTC":"78.52083806"}
   * @return {Promise<Ticker[]>}
   */
  async returnTickers(): Promise<ITicker[]> {
      try {
          const url = `https://poloniex.com/public?command=returnTicker`;
          const reqOptions = new RequestGetQueue(url)
          const jsonData = (await httpService.enqueue<{[x: string]: ITicker}>(reqOptions)).result;

          const date = DateTime.utc().toJSDate();
          const arr = [];
          for (const currencyName in jsonData) {
              if (Object.prototype.hasOwnProperty.call(jsonData, currencyName)) {
                const ticker = jsonData[currencyName];
                const {
                    baseVolume,
                    high24hr,
                    highestBid,
                    isFrozen,
                    last,
                    low24hr,
                    lowestAsk,
                    percentChange,
                    quoteVolume,
                } = ticker as never

                arr.push({
                    baseVolume: parseFloat(baseVolume),
                    high24hr: parseFloat(high24hr),
                    highestBid: parseFloat(highestBid),
                    isFrozen: parseFloat(isFrozen),
                    last: parseFloat(last),
                    low24hr: parseFloat(low24hr),
                    lowestAsk: parseFloat(lowestAsk),
                    percentChange: parseFloat(percentChange),
                    quoteVolume: parseFloat(quoteVolume), 
                    currencyName, 
                    date});
              }
          }
          return arr;
      } catch (error) {
          console.error(error);
          throw error;
      }
  }
}

export const publicApi = new PublicApi()
