import { Component ,OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Nano-Neuron';
  epochs = [];
  epoch=[];
  predict;
  alpha = 0.0005;
  datasets=[];
  xfield ='xtrain';
  yfield='ytrain'
  NanoNeurons={}
  trained_model = {};
  loadingdata={};
  tempInCelsius = 70;
  
  public data: any;
  public layout: any;

 // nanoNeuron = new NanoNeuron(w, b);
  
 constructor(private httpClient: HttpClient) {}
    ngOnInit()
    {}
  
    generateData(newValue)
     { 
       this.datasets.push(newValue);
        console.log('value pushed:',this.datasets)
     }

    NanoNeuron(w, b)
     {
      w = w;
      b = b;
      this.predict = (x) => {
      return x * w + b;
    }
}
     celsiusToFahrenheit(c) {
       const w = 1.8;
       const b = 32;
       const f = c * w + b;
       return f;
      }

     // const [xTrain, yTrain, xTest, yTest] = generateDataSets();

  generatedatasets()
      {
       const xTrain = [];
         const yTrain = [];
          for (let x = 0; x < 10; x += 1) {
            const y =this. celsiusToFahrenheit(x);
             xTrain.push(x);
               yTrain.push(y);
             }
              const xTest = [];
               const yTest = [];
                 for (let x = 0.5; x < 5; x += 1)
                    {
                      const y = this.celsiusToFahrenheit(x);
                        xTest.push(x);
                         yTest.push(y);
                     }
                      return [xTrain, yTrain, xTest, yTest];
                     }


     forwardPropagation(model, xTrain, yTrain)
      {
        let predictionCost;
         let nanoNeuron
          const m = xTrain.length;
           const predictions = [];
            let cost = 0;
             for (let i = 0; i < m; i += 1) {
              const prediction = nanoNeuron.predict(xTrain[i]);
               cost += predictionCost(yTrain[i], prediction);
        //  console.log('cost1',cost)
                 predictions.push(prediction);
                   console.log('prediction forward' ,prediction    )
        
      }
        cost /= m;
        console.log('cost    valueeee is :',cost)
        return [predictions, cost];
      }
       backwardPropagation(predictions, xTrain, yTrain) 
       {
         const m = xTrain.length;
         let dW = 0;
         let dB = 0;
         for (let i = 0; i < m; i += 1){
         dW += (yTrain[i] - predictions[i]) * xTrain[i];
         console.log(' Dw7777777777777', dW += (yTrain[i] - predictions[i]) * xTrain[i])
         dB += yTrain[i] - predictions[i];
         console.log('dB***********', dB += yTrain[i] - predictions[i])

       }
    
       dW /= m;
       console.log('average dw', dW  )

       dB /= m;
       console.log('AVERAGE DB',  dB )
       return [dW, dB];
       }
        async trainModel({model, epochs, alpha, xTrain, yTrain})
       {
         let nanoNeuron;
         const costHistory = [];
         for (let epoch = 0; epoch < epochs; epoch += 1){
         const [predictions, cost] = this.forwardPropagation(model, xTrain, yTrain);
         costHistory.push(cost);
         const [dW, dB] = this.backwardPropagation(predictions, xTrain, yTrain);
         nanoNeuron.w += alpha * dW;
         console.log('nanoNeuron dw',nanoNeuron.w)
         nanoNeuron.b += alpha * dB;
         console.log('nanoNeuron dB',nanoNeuron.b)
       }
       
       console.log('trainmodel',this.trainModel({model, epochs, alpha, xTrain, yTrain}))
        return costHistory;
       }
        w=Math.random()
        b = Math.random();
    /*  getdata(){
        var arr = [];
        for (let i=0; i<10; i++) {
          arr.push(Array(10).fill(0).map(()=>Math.random()));
        }
        return arr

      }
      */
       fetchdata()
       {
       }
}
