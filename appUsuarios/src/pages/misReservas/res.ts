import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Validators, FormGroup, FormControl } from '@angular/forms';

import { AngularFireModule, AuthMethods, FirebaseListObservable, AngularFire } from 'angularfire2';

import { GestUs } from '../gestUs/gestUs'

import firebase from 'firebase';
import { ToastController } from 'ionic-angular'
import { MyApp } from '../../app/app.component'

@Component({
  selector: 'page-Res',
  templateUrl: 'Res.html'
})
export class Res {

  //usersRef: any = firebase.database().ref('Usuarios');

  datos:any;
  reservas: FirebaseListObservable<any>;
  reserva: FirebaseListObservable<any>;

    us: any;
    nombre: any;
    ref: any;
    uid: any;
    hora: any;
    ab: any;
    noab: any;
    pista: any;
    dia: any;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public af: AngularFire,
              public toastCtrl: ToastController
              ) 
  {
    
    this.us = this.navParams.get('us');
    this.nombre = this.navParams.get('nombre');
    this.ref = this.navParams.get('referencia');
    this.uid = this.navParams.get('uid');
    this.pista = this.navParams.get('pista');
    this.hora = this.navParams.get('hora');
    this.ab = this.navParams.get('ab');
    this.noab = this.navParams.get('noab');
    this.dia = this.navParams.get('dia');


    this.reservas = this.af.database.list('/Reservas');
    this.reserva = this.af.database.list('/Reservas', {
        query: {
            orderByChild: 'uid',
            equalTo: this.uid
        }
    });

  }

  ngOnInit() {
    this.datos = new FormGroup({
        us: new FormControl(this.navParams.get('us')),
        nombre: new FormControl(this.navParams.get('nombre')),
        pista: new FormControl(this.navParams.get('pista')),
        hora: new FormControl(this.navParams.get('hora')),
        ab: new FormControl(this.navParams.get('abonado')),
        noab: new FormControl(this.navParams.get('noab')),
        dia: new FormControl(this.navParams.get('dia'))
    })
  }

  eliminar(){
    this.reserva.subscribe(items => {
      items.forEach(r => {
        this.reservas.remove(r);
        this.navCtrl.push(MyApp);
      })
    })
  }

  cancelar(){
    this.navCtrl.push(MyApp);
  }

  
}
