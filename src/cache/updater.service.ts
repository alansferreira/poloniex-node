// import * as Poloniex from 'poloniex-api-node';
// import ticker from './ticker';
// import volume from './volume';

// // setInterval(() => { 
// //     console.clear()
// //     console.table(ticker.all().filter(t => t.currencyPair.startsWith('BTC_')))
// // }, 1000)
// type fnMessageHandler = (data, seq) => void

// export interface ICacheUpdaterOptions {
//     subscribes: Array<'accountNotifications' | 'trollbox' | 'ticker' | 'volume' | 'heartbeat'>
// }

// export class CacheUpdater {
//     private _polo = new Poloniex();
//     private messageHandlers: {[x: string]: fnMessageHandler} = {}
    
//     constructor(private options: ICacheUpdaterOptions) {
//         this.messageHandlers = {
//             'ticker': ticker.put.bind(ticker),
//             'volume': volume.put.bind(volume)
//         }
//         this._polo.on('message', (channelName, data, seq) => {
//             const handler = this.messageHandlers[channelName]
//             if(!handler) return
//             handler(data, seq)
//         });
        
//         this._polo.on('open', () => {
//           console.log(`Poloniex WebSocket connection open`);
//         });
        
//         this._polo.on('close', (reason, details) => {
//           console.log(`Poloniex WebSocket connection disconnected`);
//           console.error(reason)
//           console.error(details)
//         });
        
//         this._polo.on('error', (reason) => {
//           console.log(`An error has occured`);
//           console.error(reason)
//         });
//     }
//     start(){
//         this._polo.subscriptions.map(s => this._polo.unsubscribe(s.channelName))
//         this.options.subscribes.map(s => this._polo.subscribe(s))
//         this._polo.openWebSocket()
//     }
//     stop(){
//         this._polo.closeWebSocket()
//     }
// }





// // function handleOrders => orders.put




