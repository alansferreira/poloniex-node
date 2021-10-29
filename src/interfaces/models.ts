export interface IAditionalCommonInfo {
    currencyName?: string
    date?: Date
}
export interface IRawVolume24h extends IAditionalCommonInfo {
    total?: number
}
export interface IExchangeVolume24h extends IAditionalCommonInfo {
    exchanged?: number
    raw?: number
}

export interface IVolume24h extends IAditionalCommonInfo{
    rawVolumes?: IRawVolume24h[];
    exchangeVolumes?: IExchangeVolume24h[]
}



export interface ILoanOrderAmount {
    rate: number;
    amount: number;
    rangeMin: number;
    rangeMax: number;
}

 
export interface ILoanOrder extends IAditionalCommonInfo {
    offers: ILoanOrderAmount[];
    demands: ILoanOrderAmount[];
}
export interface ITrade {
    date: Date;
    type: string;
    rate: number;
    amount: number;
    total: number;
}

export interface IReturnTradeHistoryOptions {
    currencyPair?: string;
    start: Date;
    end?: Date;
}
export interface IFeeInfoResult {
    makerFee: number;
    takerFee: number;
    thirtyDayVolume: number;
    nextTier: number;
}
export interface IBalance {
    name: string;
    available: number;
    onOrders: number;
    btcValue: number;
}
export interface IDepositAddress {
    name: string;
    address: string;
}
export interface IOpennedOrder {
    currencyPair: string;
    orderNumber: number;
    type: 'buy' | 'sell';
    rate: number;
    amount: number;
    total: number;
    margin: number;
    date: Date;
}
export interface IOrder {
    currencyPair: number;
    rate: number;
    amount: number;
    /**
     * A fill-or-kill order will either fill in its entirety or be completely aborted
     */
    fillOrKill: boolean; 
    /**
     * An immediate-or-cancel order can be partially or completely filled, but any portion of the order that cannot be filled immediately will be canceled rather than left on the order book
     */
    immediateOrCancel: boolean; 
    /**
     * A post-only order will only be placed if no portion of it fills immediately; this guarantees you will never pay the taker fee on any part of the order that fills
     */
    postOnly: boolean; 
}

export interface IOrderResult {
    success: number;
    orderNumber: number;
    resultingTrades: IOrderResult_ResultTrade[];
}
export interface IOrderResult_ResultTrade {
     amount: number;
     date: Date;
     rate: number;
     total: number;
     tradeID: number;
     type: string;
}
export interface IReturnChartDataOptions {
    currencyPair: string; 
    start: Date;
    end?: Date | null;
    /**
     * candlestick period in seconds; valid values are 300, 900 30m, 1800 1h, 7200 2h, 14400 4h, and 86400 24h
     * > 14400 == (4 * 60 * 60) to 4h, default is 14400`
     */
    period: "5m" | "30m" | "1h" | "2h" | "4h" | "24h";
}
export interface IChartCandle {
    /**
     * if Date is in Unix format remember that multiply for 1000
     */
    date: Date;
    high: number;
    low: number;
    open: number;
    close: number;
    volume: number;
    quoteVolume: number;
    weightedAverage: number;

}
export interface ITicker extends IAditionalCommonInfo {

    id?:number
    postOnly?:number
    baseVolume: number;
    high24hr: number;
    highestBid: number;
    isFrozen: number;
    last: number;
    low24hr: number;
    lowestAsk: number;
    percentChange: number;
    quoteVolume: number;
}

export interface IOrderBookEntry {
    rate: number;
    amount: number;
}

export interface IOrderBook extends IAditionalCommonInfo {
    isFrozen: boolean;
    seq: number;
    postOnly: boolean
    /**
     * sells orders
     */
    asks: IOrderBookEntry[];
    /**
     * buy orders
     */
    bids: IOrderBookEntry[];
}