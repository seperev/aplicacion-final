import { Component } from '@angular/core';

import {AngularFire, FirebaseListObservable, AuthProviders, AuthMethods} from 'angularfire2';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth-provider';
import { Reservar } from '../reservar/reservar';

import firebase from 'firebase';

@Component({
  selector: 'page-misReservas',
  templateUrl: 'misReservas.html'
})

export class MisReservas {

  usuario:any;
  user:any;
  reservas:any
  nombre:any;
  us: any;

  constructor(public navCtrl: NavController,  
              public alertCtrl: AlertController, public af: AngularFire, 
              public actionSheetCtrl: ActionSheetController, 
              public auth:AuthProvider,
              ) {
    
    let recogidas = false;
    this.user = firebase.auth().currentUser;

    this.usuario = this.af.database.list('/Usuarios', {
        query: {
            orderByChild: 'uid',
            equalTo: this.user.uid
        }
    });

    this.usuario.subscribe(items => {
      items.forEach(u => {
        this.us = u.usuario
      })
      this.reservas = af.database.list('/Reservas', {
        query: {
          orderByChild: 'usuario',
          equalTo: this.us
        }
      })
    })


  }

  logout(){
    this.auth.logout();
  }
}
