import { Component } from '@angular/core';

import {AngularFire, FirebaseListObservable, AuthProviders, AuthMethods} from 'angularfire2';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';


import { VerRes } from '../gestRes/verRes';

import firebase from 'firebase';


@Component({
  selector: 'page-gestRes',
  templateUrl: 'gestRes.html'
})
export class GestRes {

  
  reservas: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController,  
              public alertCtrl: AlertController, public af: AngularFire, 
              public actionSheetCtrl: ActionSheetController
              ) {    
                  this.reservas = this.af.database.list('/Reservas');
  }

  verReserva(r, clave){
    let us = r.usuario;
    let nombre = r.nombre;
    let hora = r.horaInicio;
    let pista = r.nombrePista;
    let uid = r.uid;
    let ref = firebase.database().ref('Reservas/' + clave);
    let ab = r.abonados;
    let noab = r.noabonados;

    this.navCtrl.push(VerRes, {
      us: us,
      nombre: nombre,
      uid: uid,
      pista: pista,
      referencia: ref,
      hora: hora,
      ab: ab,
      noab: noab
    })
  }

}
