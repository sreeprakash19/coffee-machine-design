import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import * as ml5 from 'ml5';
import { ConstantPool } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AppComponent implements OnInit, AfterViewInit {

  title = 'facerecog';
  @ViewChild('video', { static: true }) video: ElementRef;
  @ViewChild('myimage', { static: false }) imagefirst: ElementRef;
  @ViewChild('myimagenext', { static: false }) imagesecond: ElementRef; 
  @ViewChild('myimagenexts', { static: false }) imagethird: ElementRef;
  @ViewChild('myimagechoose', { static: false }) imagechoose: ElementRef;
  public mobileNetFeatureExtractor;
  public featureClassifier;
  public labelresult = 'Wait ...';
  public confidence;
  public newLabel;
  public currentProgress = 0;
  public loss: number;
  public iteration: number;
  @ViewChild('canvas', { static: false }) public canvas: ElementRef;
  canvasElement: any;
  context: any;
  videostreamRef: any;
  videoElement: HTMLVideoElement;
  public captures: Array<any>;
  public videoEl: HTMLVideoElement;
  public canvas1: any;

  public imagePath;
  imgURL: any;
  imgURLnext: any;
  imgURLnexts: any;
  imgURLchoose: any;
  public message: string;
  public newLabelnext;
  public newLabelchoose;
  public newLabelnexts;

  constructor(private zone: NgZone) {
    this.captures = [];


  }
  ngAfterViewInit() {
    console.log(webkitURL);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.video.nativeElement.srcObject = stream;
        this.videostreamRef = stream;
        this.video.nativeElement.play();
      });
    }

  }
  ngOnInit(): void {
    this.mobileNetFeatureExtractor = ml5.featureExtractor('MobileNet', () => {      
      this.featureClassifier = this.mobileNetFeatureExtractor.classification(this.video.nativeElement, () => {
        console.log('Classifer Ready');
      });
    });

  }
  AddImg(){
    this.featureClassifier.addImage(this.imagefirst.nativeElement, 'Left');
    console.log('reached',this.mobileNetFeatureExtractor, 'class', this.featureClassifier);
  }
  
  AddnextImg(){
    this.featureClassifier.addImage(this.imagesecond.nativeElement, 'Right');
    console.log(this.mobileNetFeatureExtractor, 'class', this.featureClassifier);
    console.log('next image added',this.AddnextImg())
  }
  AddImages(){
    this.featureClassifier.addImage(this.imagethird.nativeElement,'center');
    console.log('thirdimage',this.mobileNetFeatureExtractor,'class',this.featureClassifier)

  }




  preview(files) {
    if (files.length === 0){
      return;
    }
      

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.imgURL = reader.result;
      this.message = 'Reader Loaded.';

    }
  }
  previewnext(files) {
    if (files.length === 0){
      return;
    }
      

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.imgURLnext = reader.result;
      this.message = 'Reader Loaded.';

    }
  }
  previewnexts(files) {
    if (files.length === 0){
      return;
    }
      

    const mimeType = files[1].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[1]);
    reader.onload = (event) => {
      this.imgURL = reader.result;
      this.message = 'Reader Loaded.';

    }
  }
  previewchoose(files) {
    if (files.length === 0) {
      return;
    }
      

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.imgURLchoose = reader.result;
      this.message = 'Reader Loaded.';

    }
  }
 
  addImage() {
    this.canvas.nativeElement.getContext('2d').drawImage(this.video.nativeElement, 0, 0, 320, 240);
    this.featureClassifier.addImage(this.canvas.nativeElement.toDataURL('image/png'), 'manoj');
    // Retrain the network
    this.featureClassifier.train((lossValue) => {
      console.log('Loss is', lossValue);
    });
/*
    // Get a prediction for that image
    this.featureClassifier.classify(this.canvas.nativeElement.toDataURL('image/png'), (_err, result) => {
      console.log(result); // Should output 'dog'
    });
    console.log('newlabel', this.newLabel);
    //this.capture();*/
  }
  async train() {

    console.log('myimage', this.imagefirst.nativeElement);
    console.log('myimagenext', this.imagesecond.nativeElement);
    console.log('myimagenexts',this.imagethird.nativeElement);

    //console.log('myimagechoose', this.imagechoose.nativeElement);
    console.log( 'class', this.featureClassifier);
    await this.featureClassifier.train(this.whileTraining);

  }
  async capture() {
    const classresult = await this.featureClassifier.classify(this.video.nativeElement);
    this.labelresult = classresult[0].label;
    setTimeout(()=>{    //<<<---    using ()=> syntax
      this.capture();
 }, 1000);
  }
  whileTraining(loss){
    if(loss === null){
    console.log('Taining Complete');
   
    } else{
    console.log(loss);
    }
    }
    
    gotResult(error, result){
     if(error){
      console.error(error);
     } else{
      return result[0].label;
      //this.labelresult = result[0].label;
      }
    }

    takepic(){
      this.canvas.nativeElement.style.display = 'block';
      this.canvasElement = this.canvas.nativeElement;
      this.context = this.canvasElement.getContext('2d');
      
      this.videostreamRef.getTracks().map((val) => {
        this.context.drawImage( this.video.nativeElement, 0, 0, 200, 200);
        //const fullQuality = this.context.toDataURL('image/jpeg', 1.0);
        //val.stop();
      });
    }

    FirstImg(){
      this.imgURL =  this.canvas.nativeElement.toDataURL('image/jpeg', 1.0);
    }

    secondImg(){
      this.imgURLnext =  this.canvas.nativeElement.toDataURL('image/jpeg', 1.0);
    }
    thirdImg(){
      this.imgURLnexts =  this.canvas.nativeElement.toDataURL('image/jpeg', 1.0);
    }
}