import * as crypto from 'crypto';
import * as https from 'https';
import { EventEmitter } from 'events';
import { Guid } from "guid-typescript";
import { URLSearchParams } from 'url';

export const PUT = 'PUT';
export const POST = 'POST';
export const GET = 'GET';
export const DELETE = 'DELETE';

export interface IRequestQueue {
    queueId: string;
    method: 'PUT' | 'POST' | 'GET' | 'DELETE';
    eventEmitter: EventEmitter;
}

export class RequestGetQueue implements IRequestQueue {
    queueId: string;
    method: 'PUT' | 'POST' | 'GET' | 'DELETE';
    url: string;
    eventEmitter: EventEmitter;
    constructor(url: string){
        this.url = url;
        this.method = GET;
    }
}

export class RequestPostQueue implements IRequestQueue {
    queueId: string;
    method: 'PUT' | 'POST' | 'GET' | 'DELETE';
    url: string;
    body: unknown;
    secret: string;
    key: string;
    data: {[x: string]: string};
    eventEmitter: EventEmitter;
    
    constructor(key: string, secret: string, data: any){
        this.secret = secret;
        this.key = key;
        this.data = data;
        this.method = POST;
    }
}

let __serviceExecutionKey;

const __keepAliveAgent = new https.Agent({ keepAlive: true });
let __queueResponsed = true;


const __executeRequest = {};
__executeRequest[PUT] = null;
__executeRequest[POST] = executePost;
__executeRequest[GET] = executeGet;
__executeRequest[DELETE] = null;

export interface IRequestResult<T>{
    source: IRequestQueue;
    result?: T;
}
export interface IRequestError{
    source: IRequestQueue;
    error?: unknown;
}
export const __queue: IRequestQueue[] = [];
export function enqueue<R>(request: IRequestQueue): Promise<IRequestResult<R>>{
    return new Promise((resolve, reject) => {

        if(!__serviceExecutionKey) start();
        
        request.queueId = Guid.create().toString();
        request.eventEmitter = new EventEmitter();

        request.eventEmitter.on('done', (data) => resolve({source: request, result: data}));
        request.eventEmitter.on('error', (error) => reject({source: request, error: error}));

        __queue.push(request);
    });
        
}

export function dequeue(): IRequestQueue | null {

    if(__queue.length > 0) return __queue.splice(0, 1)[0];
    
    return null;

}

export function start() {
    // traceExecutionKey = setInterval(trace, 50);
    __serviceExecutionKey = setInterval(() => {
        if(!__queueResponsed)return;

        const req = dequeue();
        if(!req) return;

        executeUrl(req);

    }, 170);
}
export function stop(){
    __queue.splice(0, __queue.length);
    clearInterval(__serviceExecutionKey);
}

function executeUrl(req){
    __executeRequest[req.method](req);
}
function executeGet(req: RequestGetQueue){
    __queueResponsed = false;

    https.get(req.url, (res)=>{
        let _body = '';
        res.on('data', function(chunk){_body += chunk;}); //append downloaded json data
        res.on('end', function(){ 
            __queueResponsed = true;

            if(!_body || _body=='') return req.eventEmitter.emit('done', null);
            try {
                const jsonData = JSON.parse(_body); 
                
                return req.eventEmitter.emit('done', jsonData);
                
            } catch (error) {
                return req.eventEmitter.emit('error', {error: error, request: req.queueId});
            }
        });
    }).on('error', function(error) {
        __queueResponsed = true;

        return req.eventEmitter.emit('error', {error: error, request: req.queueId});
    });
}

function executePost(req: RequestPostQueue){
    __queueResponsed = false;
    const _secret = req.secret;
    const _key = req.key;
    let data = req.data;
    data = Object.assign({nonce: new Date().getTime()}, data);

    const body = new URLSearchParams(data).toString();
    const sign = crypto.createHmac("sha512", _secret).update(body).digest('hex');

    const request = https.request({
        host: 'poloniex.com',
        path: '/tradingApi',
        
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded', 
            'Key': _key, 
            'Sign': sign
        },
        agent: __keepAliveAgent
    });

    request.on('response', (res)=>{
        let _body = '';
        res.on('data', function(chunk){_body += chunk;}); //append downloaded json data
        res.on('end', function(){ 
            __queueResponsed = true;
            if(!_body || _body=='') return req.eventEmitter.emit('done', null);
            try {
                const jsonData = JSON.parse(_body); 
                
                if(jsonData.error) return req.eventEmitter.emit('error', jsonData);
                return req.eventEmitter.emit('done', jsonData);
            } catch (error) {
                return req.eventEmitter.emit('error', {error: error, request: req.queueId});
            }
        });

    });

    request.on('error', (error)=>{
        __queueResponsed = true;
        return req.eventEmitter.emit('error', {error: error, request: req.queueId});
    });

    request.end(body);
}

