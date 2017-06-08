import { Component } from '@angular/core';

import {AngularFire, FirebaseListObservable, AuthProviders, AuthMethods} from 'angularfire2';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';


import { VerRes } from '../gestRes/verRes';

import firebase from 'firebase';

import { AuthProvider } from '../../providers/auth-provider';


@Component({
  selector: 'page-estadisticas',
  templateUrl: 'estadisticas.html'
})
export class Estadisticas {

  pi: FirebaseListObservable<any>;
  reservas: FirebaseListObservable<any>;
  pistas = [];
  mayor = 0;
  pist: any;
  horas = [];
  usada = 0;
  hor: any;

  constructor(public navCtrl: NavController,  
              public alertCtrl: AlertController, public af: AngularFire, 
              public actionSheetCtrl: ActionSheetController, 
              public auth:AuthProvider,
              ) {    
                  let pistasguardadas = false;

                  for(let j = 0; j < 12; j++){
                      this.horas.push({clave:10+j,valor:0});
                  }

                  this.reservas = this.af.database.list('/Reservas');
                  this.pi = this.af.database.list('/Pistas');
                  this.pi.subscribe(items => {
                    items.forEach(p => {
                        this.pistas.push({clave:p.nombre, valor:0});
                        
                    })
                    pistasguardadas = true
                  });

                  if(pistasguardadas){
                    this.reservas.subscribe(items => {
                        items.forEach(r => {
                            for(let i = 0; i < this.pistas.length; i++){
                                if(r.nombrePista == this.pistas[i].clave){
                                    this.pistas[i].valor = this.pistas[i].valor + 1;
                                }
                            }
                            for(let l = 0; l < this.horas.length; l++){
                                if(r.horaInicio == this.horas[l].clave){
                                    this.horas[l].valor = this.horas[l].valor + 1;
                                }
                            }
                        })

                        for(let k = 0; k < this.pistas.length; k++){
                            if(this.pistas[k].valor > this.mayor){
                                this.mayor = this.pistas[k].valor;
                                this.pist = this.pistas[k].clave;
                            }
                        }

                        for(let j = 0; j < this.horas.length; j++){
                            if(this.horas[j].valor > this.usada){
                                this.usada = this.horas[j].valor;
                                this.hor = this.horas[j].clave;
                            }
                        }

                        console.log(this.pistas);
                    })
                  }


                  console.log(this.horas)
      
  }

  logout(){
    this.auth.logout();
  }

}
