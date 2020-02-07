import { Component,  OnInit,Inject } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}



@Component({
  selector: 'app-feature-start',
  templateUrl: './feature-start.component.html',
  styleUrls: ['./feature-start.component.css'],

  
})
  export class FeatureStartComponent implements OnInit { 
  animal: string;
  name: string;
  
  constructor( private sanitizer: DomSanitizer, public dialog: MatDialog) { }
  thumbnail: any;
  thumbnail1: any;
  thumbnail2: any;
  nextimage:any;
  index = 3;
  cards = ['Card 1','Card 2'];


  rewind(){}
  foeward()
  {
    this.nextimage
  }
 ngOnInit(): void {
    this.loadimages().then(_ => {
      console.log('loaded');
    });
   }
 async loadimages() {
 
 this.thumbnail = await this.sanitizer.bypassSecurityTrustUrl('https://lh3.googleusercontent.com/a-/AAuE7mDcM-XfiG-OgprYqulFoAgKDCAvnWSDiiLqiiXx');
 
 this.thumbnail1 = await this.sanitizer.bypassSecurityTrustUrl('https://lh3.googleusercontent.com/-vxVFUq1yJ0U/XZQoB5ogLFI/AAAAAAAAADY/SL4-7Obb8XsXPnDIboXRS4VRGC8dAS-LQCEwYBhgL/w140-h140-p/facebook_1569229435636.jpg');

 this.thumbnail2 = await this.sanitizer.bypassSecurityTrustUrl('https://lh3.googleusercontent.com/-mHhFtrFqkpg/Xi642uM7knI/AAAAAAAAAkQ/-ZrLcQ_S1HASVSnDt0Ay-SLnlQQTMsunwCEwYBhgL/w140-h139-p/DSC00902.JPG');

  }

  //addingcard 
  addCard() {
    this.cards.push('Card ' + (++this.index));
  }
  deleteCard(i) {
    this.cards.splice(i, 1);
  }

  
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      height:'250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
  }


  @Component({
    selector: 'dialog-overview-example-dialog',
    template:`
              <div class="dialog">
             <h1>Family Update</h1>
             <mat-form-field>
             <input matInput  placeholder="Father name">
             </mat-form-field> 
             <mat-form-field>
             <input matInput  placeholder="Mother Name">
             </mat-form-field>
             <mat-form-field>
             <input matInput  placeholder="Daughter name">
             </mat-form-field> 
             <mat-form-field>
             <input matInput  placeholder="Son name">
             </mat-form-field> 

             </div> 
    `
  /*  template: `<h1 mat-dialog-title>Hi {{data.name}}</h1>
    <div mat-dialog-content>
      <p>What's your favorite animal?</p>
      <mat-form-field>
        <input matInput [(ngModel)]="data.animal">
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">No Thanks</button>
      <button mat-button [mat-dialog-close]="data.animal" cdkFocusInitial>Ok</button>
    </div>`,
    */
  })
  export class DialogOverviewExampleDialog  {
  
    constructor(
      public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }

