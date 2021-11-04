import { enqueue, RequestGetQueue, stop, __queue } from '../http-queue.service';
// import { RequestGetQueue } from '../http-queue.service';

jest.setTimeout((13*170)+10000)

describe('should show data from poloniex exchange', () => {
    afterAll(async () => {
        stop()
    })
    test('should be executes requests by 500 mili', async () => {
        await new Promise<void>((resolve) => {

            let isDoned = false;
            function displayData(){
                expect(__queue.length).toBeLessThan(13)
                if(__queue.length==0 && !isDoned){
                    isDoned = true;
                    resolve()
                }
            };

            function displayError(){
                expect(__queue.length).toBeLessThan(13)
                if(__queue.length==0 && !isDoned){
                    isDoned = true;
                    resolve();
                }
            };
            const url = 'https://poloniex.com/public?command=returnChartData&currencyPair=BTC_BCN&start=1500624736.83&end=9999999999&period=14400'
            enqueue(new RequestGetQueue(url)).then(displayData).catch(displayError);
            enqueue(new RequestGetQueue(url)).then(displayData).catch(displayError);
            enqueue(new RequestGetQueue(url)).then(displayData).catch(displayError);
            enqueue(new RequestGetQueue(url)).then(displayData).catch(displayError);
            enqueue(new RequestGetQueue(url)).then(displayData).catch(displayError);
            enqueue(new RequestGetQueue(url)).then(displayData).catch(displayError);
            enqueue(new RequestGetQueue(url)).then(displayData).catch(displayError);
            enqueue(new RequestGetQueue(url)).then(displayData).catch(displayError);
            enqueue(new RequestGetQueue(url)).then(displayData).catch(displayError);
            enqueue(new RequestGetQueue(url)).then(displayData).catch(displayError);
            enqueue(new RequestGetQueue(url)).then(displayData).catch(displayError);
            enqueue(new RequestGetQueue(url)).then(displayData).catch(displayError);
            enqueue(new RequestGetQueue(url)).then(displayData).catch(displayError);
            
            expect(__queue.length).toEqual(13)
        })

    });
    
});
