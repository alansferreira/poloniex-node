import { IFeeInfoResult, IOpennedOrder, IOrderResult, IBalance, IVolume24h, IChartCandle, IOrderBook, ILoanOrder, ITicker, ITrade, IOrder, IReturnChartDataOptions } from "./models";

export interface IMarketOperations{
    
    /**
     * 
     * @param {*} _key 
     * @param {*} _secret 
     * @param {ReturnTradeHistoryOptions} options 
     * @return {Promise<Trade[]>}
     */
    returnTradeHistory(options): Promise<ITrade[]>


    /**
     * 
     * @param {*} _key 
     * @param {*} _secret 
     * @return {Promise<IFeeInfoResult>}
     */
    returnFeeInfo() : Promise<IFeeInfoResult>;

    returnBalances(onlyWithAmount?: boolean): Promise<IBalance[]>;

    /**
     * 
     * @param {*} _key 
     * @param {*} _secret 
     * @param {String?} currencyPair posts 'all' is ommited
     * @return {Promise<IOpennedOrder[]>}
     */
    returnOpenOrders(currencyPair?: string): Promise<IOpennedOrder[]>;

    /**
     * 
     * @param {*} _key 
     * @param {*} _secret 
     * @param {Number} orderNumber 
     * @param {Number} rate 
     * @return {Promise<IOpennedOrder>}
     */
    moveOrder(orderNumber: number, rate: number): Promise<IOpennedOrder>;

    /**
     * 
     * @param {Order} order
     * @return {Promise<IOrderResult>} order 
     */
    buy(order: IOrder): Promise<IOrderResult>;

    /**
     * 
     * @param {Number} orderNumber
     * @return {Promise<{success: boolean}>}
     */
    cancelOrder(orderNumber:number) : Promise<{success: boolean}>;

    /**
     * 
     * @param {Order} order 
     * @return {Promise<IOrderResult>}
     */
    sell(order: IOrder): Promise<IOrderResult>;

    /**
     * 
     * @return {Promise<IBalance>} order 
     */
    returnCompleteBalances(account, onlyWithAmount: boolean) : Promise<IBalance[]>;


    /**
     * Call: https://poloniex.com/public?command=return24hVolume
     *
     * Returns the 24-hour volume for all markets, plus totals for primary currencies. Sample output: 
     * {"BTC_LTC":{"BTC":"2.23248854","LTC":"87.10381314"},"BTC_NXT":{"BTC":"0.981616","NXT":"14145"}, ... "totalBTC":"81.89657704","totalLTC":"78.52083806"}
     * 
     * @return {Promise<IVolume24h[]>}
     */
    return24hVolume(): Promise<IVolume24h[]>;

    /**
     * call´s the https://poloniex.com/public?command=returnChartData
     * Returns candlestick chart data. 
     * Required GET parameters are "currencyPair", "period" 
     * (candlestick period in seconds; valid values are 300, 900 30m, 1800 1h, 7200 2h, 14400 4h, and 86400), "start", and "end". "Start" and "end" are given in UNIX timestamp format and used to specify the date range for the data returned. 
     *   Sample output:
     *      [{"date":1405699200,"high":0.0045388,"low":0.00403001,"open":0.00404545,"close":0.00427592,"volume":44.11655644,"quoteVolume":10259.29079097,"weightedAverage":0.00430015}, ...]
     * 
     * @param {returnChartDataOptions} options
     * @return {Promise<IChartCandle[]>}
     */
    returnChartData(options: IReturnChartDataOptions): Promise<IChartCandle[]>;
    /**
     * call´s https://poloniex.com/public?command=returnOrderBook
     * Returns the order book for a given market, as well as a sequence number for use with the Push API and an indicator specifying whether the market is frozen. You may set currencyPair to "all" to get the order books of all markets. Sample output:
     * 
     * {"asks":[[0.00007600,1164],[0.00007620,1300], ... ], "bids":[[0.00006901,200],[0.00006900,408], ... ], "isFrozen": 0, "seq": 18849}
     * 
     * Or, for all markets:
     * 
     * {"BTC_NXT":{"asks":[[0.00007600,1164],[0.00007620,1300], ... ], "bids":[[0.00006901,200],[0.00006900,408], ... ], "isFrozen": 0, "seq": 149},"BTC_XMR":...}
     * @param {string} currencyPair omit for 'all'
     * @return {Promise<IOrderBook>}
     */
    returnOrderBook(currencyPair: string): Promise<IOrderBook>;

    /**
     * call´s https://poloniex.com/public?command=returnLoanOrders&currency=${tickerName}
     * Returns the list of loan offers and demands for a given currency, specified by the "currency" GET parameter. 
     * Sample output:
     *      {"offers":[{"rate":"0.00200000","amount":"64.66305732","rangeMin":2,"rangeMax":8}, ... ],"demands":[{"rate":"0.00170000","amount":"26.54848841","rangeMin":2,"rangeMax":2}, ... ]}
     * @param {string} tickerName  currency name
     * @return {Promise<ILoanOrder>}
     */
    returnLoanOrders(tickerName: string) : Promise<ILoanOrder>;


    /**
     * call´s https://poloniex.com/public?command=returnTicker
     * Returns the 24-hour volume for all markets, plus totals for primary currencies. Sample output:
     *      {"BTC_LTC":{"BTC":"2.23248854","LTC":"87.10381314"},"BTC_NXT":{"BTC":"0.981616","NXT":"14145"}, ... "totalBTC":"81.89657704","totalLTC":"78.52083806"}
     * @return {Promise<ITicker[]>}
     */
    returnTickers(): Promise<ITicker[]>;

}