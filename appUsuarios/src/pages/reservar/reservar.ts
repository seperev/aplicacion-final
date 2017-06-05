import { Component } from '@angular/core';

import {AngularFire, FirebaseListObservable, AuthProviders, AuthMethods} from 'angularfire2';
import { NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';

import firebase from 'firebase';

import { Validators, FormGroup, FormControl } from '@angular/forms';

import { Reservas } from '../reservas/reservas';
import { ToastController } from 'ionic-angular'
import { MyApp } from '../../app/app.component'

@Component({
  selector: 'page-reservar',
  templateUrl: 'reservar.html'
})

export class Reservar {


  reserva:any;  
  reservas: FirebaseListObservable<any>;
  pista:any;
  hora:any;
  user:any;
  nombre:any;
  usuario:any;
  dia:any;

  constructor(public navCtrl: NavController, 
              public alertCtrl: AlertController, public af: AngularFire, 
              public actionSheetCtrl: ActionSheetController,
              public params: NavParams,
              public toastCtrl: ToastController) {

    this.reservas = af.database.list('/Reservas');

    this.pista = params.get('pista');
    this.hora = params.get('hora');
    this.dia = params.get('dia');
    this.user = firebase.auth().currentUser;
    this.usuario = af.database.list('/Usuarios', {
      query: {
        orderByChild: 'uid',
        equalTo: this.user.uid
      }
    });   
  }

  
  ngOnInit() {
    this.reserva = new FormGroup({
        nombre: new FormControl(""),
        abonados: new FormControl(""),
        noabonados: new FormControl(""),
        hora: new FormControl(""),
        pista: new FormControl("")
    })
    this.usuario.subscribe(items => {
      items.forEach(usuario => {
        this.nombre = usuario.usuario;
      })
    })    
  }

  reservar(){
    let r = this.reserva.value;

    let ab:number;
    let noab:number;
    

    ab = parseInt(r.abonados);
    noab = parseInt(r.noabonados);

    // Cuando no son modificados los valores del número de abonados o no abonados, devuelven un valor NaN que es 
    // como si tuviese un valor falso, por lo tanto compruebo que si el valor me da falso pongo a mano el valor a 0.

    if(!r.abonados){
      ab = 0;
    }
    if(!r.noabonados){
      noab = 0;
    }

    let suma:number;
    suma = ab += noab;

    console.log(suma);

    if(suma == 4){
      this.reservas.push({
        dia: this.dia,
        horaInicio: this.hora,
        nombre: 'Reserva de ' + this.nombre,
        nombrePista: this.pista,
        uid: this.dia + '-' + this.hora + '-' + this.pista,
        abonados: ab,
        noabonados: noab,
        usuario: this.nombre,
        completo: true
      })
      this.navCtrl.push(MyApp);
    }
    else if(suma > 4){
      let toast = this.toastCtrl.create({
        message: 'No puedes introducir más de 4 jugadores',
        duration: 3000
      });
      toast.present();
    }
    else if(suma <= 0){
      let toast = this.toastCtrl.create({
        message: 'Introduce el numero de jugadores',
        duration: 3000
      });
      toast.present();
    }
    else{
      this.reservas.push({
        dia: this.dia,
        horaInicio: this.hora,
        nombre: 'Reserva de ' + this.nombre,
        nombrePista: this.pista,
        uid: this.dia + '-' + this.hora + '-' + this.pista,
        abonados: ab,
        noabonados: noab,
        usuario: this.nombre,
        completo: false
      })
      this.navCtrl.push(MyApp);
    }
    
  }

}