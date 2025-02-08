import * as d3 from 'd3'

// function to load the data sert with latency
export function DataLoader(dataSetUrl : string , latency : number, callback : any,...args: any ){
    // 
    setTimeout(()=>
    
      d3.csv(dataSetUrl)
        .then((data ) => {
          callback(data,...args);
        })
        .catch((err) => {
          console.error("We are sorry, but an error occured ): !!.");
          console.error(err);
        }
      ),
      latency
    );
      
  }
  