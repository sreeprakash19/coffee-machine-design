import { Component } from '@angular/core';
import { Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import { UserService } from './user.service';

export interface Pokemon {
  value: string;
  viewValue: string;
}

export interface PokemonGroup {
  disabled?: boolean;
  name: string;
  pokemon: Pokemon[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

 export class AppComponent {
  title = 'test';
  pokemonControl = new FormControl('page');
  pokemonGroups: PokemonGroup[] = [
   {
      name: 'Featurestart',
      pokemon: [
        {value: 'feature-start', viewValue: 'Featurestart'}
      ]
    },
   
    {
      name: 'LoginPage',
      pokemon: [
        {value: 'login-page', viewValue: 'MyMember-Login'}
      ]
    },
    {
      name: 'Database',
      pokemon: [
        {value: 'database', viewValue: 'Database'}
      ]
    }

  ];
  pokemonControltc = new FormControl({value: '', disabled: true});
  pokemonGroupstc: PokemonGroup[] = [
    
    {
      name: 'Featurestart',
      pokemon: [
        {value: 'feature-start', viewValue: 'Featurestart'},
       // {value: 'family-member', viewValue: 'FamilyMembers'}
      ]
    },
  {
      name: 'LoginPage',
      pokemon: [
        {value: 'login-page', viewValue: 'loginpage'},
        {value: 'stepper-page', viewValue: 'stepperpage'},
        
      ]
    },
    {
      name: 'Database',
      pokemon: [
        {value: 'database', viewValue: 'Database'}
      ]
    }



  ];
  constructor(private router: Router, public svc: UserService){
    this.svc.footerdisplay = `
   Testing
   `;
  }
  ClickSelect(location: string){
    if(location != null){
      this.router.navigateByUrl(location);
      this.pokemonControltc.reset({ value: this.pokemonControl.value, disabled: false });
    }
   
  }
  clickedNone(){
    this.router.navigate(['\hom']);
    }
  clickedNonetc(){
    this.router.navigateByUrl(this.pokemonControl.value);
  }
  ClickSelecttc(location: string){
    if(location != null){
      this.svc.hellotext = location;
      this.svc.sendData(location);
      this.router.navigateByUrl(location);
    }
  }
  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
}

