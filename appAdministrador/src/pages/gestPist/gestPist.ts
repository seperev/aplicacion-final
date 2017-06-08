import { Component } from '@angular/core';

import {AngularFire, FirebaseListObservable, AuthProviders, AuthMethods} from 'angularfire2';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';


import { VerPist } from '../gestPist/verPist'
import { CrearPista } from '../crearPista/crearPista'

import firebase from 'firebase';

import { AuthProvider } from '../../providers/auth-provider';


@Component({
  selector: 'page-gestPist',
  templateUrl: 'gestPist.html'
})
export class GestPist {

  
  pistas: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController,  
              public alertCtrl: AlertController, public af: AngularFire, 
              public actionSheetCtrl: ActionSheetController, 
              public auth:AuthProvider,
              ) {    
                  this.pistas = this.af.database.list('/Pistas');
  }

  verPista(p, clave){
    let nombre = p.nombre;
    let descripcion = p.descripcion;
    let ref = firebase.database().ref('Pistas/' + clave);

    this.navCtrl.push(VerPist, {
      nombre: nombre,
      descripcion: descripcion,
      referencia: ref,
    })
  }

  crearPista(){
    this.navCtrl.push(CrearPista);
  }

    logout(){
    this.auth.logout();
  }

}
