
function NanoNeuron(w, b) {
    this.w = w;
    this.b = b;
    this.predict = (x) => {
      return x * this.w + this.b;
    }
  }
  
  function celsiusToFahrenheit(c) {
    const w = 1.8;
    const b = 32;
    const f = c * w + b;
    return f;
  }; 
  function generateDataSets() {
    const xTrain = [];
    const yTrain = [];
    for (let x = 0; x < 10; x += 1) {
      const y = celsiusToFahrenheit(x);
      xTrain.push(x);
      yTrain.push(y);
    }
  
   
    const xTest = [];
    const yTest = [];
    for (let x = 0.5; x < 5; x += 1) {
      const y = celsiusToFahrenheit(x);
      xTest.push(x);
      yTest.push(y);
    }
  
    return [xTrain, yTrain, xTest, yTest];
  }
  function predictionCost(y, prediction) {
    console.log('y value',y);
    console.log('prediction cost',(y - prediction) ** 2 / 2)
     return (y - prediction) ** 2 / 2;
  
  }
  
  function forwardPropagation(model, xTrain, yTrain) {
    const m = xTrain.length;
    const predictions = [];
    let cost = 0;
    for (let i = 0; i < m; i += 1) {
      const prediction = nanoNeuron.predict(xTrain[i]);
      cost += predictionCost(yTrain[i], prediction);
      predictions.push(prediction);
      console.log('prediction forward' ,prediction    )
      
    }
  
    cost /= m;
    console.log('cost    valueeee is :',cost)
    return [predictions, cost];
  }
  
  function backwardPropagation(predictions, xTrain, yTrain) {
    const m = xTrain.length;
   
    let dW = 0;
    let dB = 0;
    for (let i = 0; i < m; i += 1) {
    
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
  
  
  function trainModel({model, epochs, alpha, xTrain, yTrain}) {
    const costHistory = [];
  
    for (let epoch = 0; epoch < epochs; epoch += 1) {
      const [predictions, cost] = forwardPropagation(model, xTrain, yTrain);
      costHistory.push(cost);
    
      const [dW, dB] = backwardPropagation(predictions, xTrain, yTrain);
      nanoNeuron.w += alpha * dW;
      console.log('nanoNeuron dw',nanoNeuron.w)
      nanoNeuron.b += alpha * dB;
      console.log('nanoNeuron dB',nanoNeuron.b)
    }
    return costHistory;
  }
  
  
  const w = Math.random(); // i.e. -> 0.9492
  const b = Math.random(); // i.e. -> 0.4570
  const nanoNeuron = new NanoNeuron(w, b);
  
  const [xTrain, yTrain, xTest, yTest] = generateDataSets();
  
  console.log('genertaed Dataset', generateDataSets())
  console.log('xTrain:',xTrain);
  console.log('xTest:',xTest);
  
  console.log('yTrain:',yTrain);
  console.log('yTest:',yTest);
  
  
  const epochs =[];
  const alpha = 0.0005;
  const trainingCostHistory = trainModel({model: nanoNeuron, epochs, alpha, xTrain, yTrain});
  console.log('trainingmodel-2',trainModel({model: nanoNeuron, epochs, alpha, xTrain, yTrain}));
  console.log('epochs value:',epochs);
   
  console.log('Cost before the training:', trainingCostHistory[0]); // i.e. -> 4694.3335043
  console.log('Cost after the training:', trainingCostHistory[epochs-1]); // i.e. -> 0.0000024
  
  console.log('NanoNeuron parameters:', {w: nanoNeuron.w, b: nanoNeuron.b}); // i.e. -> {w: 1.8, b: 31.99}
  
  [testPredictions, testCost] = forwardPropagation(nanoNeuron, xTest, yTest);
  console.log('Cost on new testing data:', testCost); // i.e. -> 0.0000023
  const tempInCelsius = 70;
  const customPrediction = nanoNeuron.predict(tempInCelsius);
  console.log(`NanoNeuron "thinks" that ${tempInCelsius}°C in Fahrenheit is:`, customPrediction); // -> 158.0002
  console.log('Correct answer is:', celsiusToFahrenheit(tempInCelsius)); // -> 158