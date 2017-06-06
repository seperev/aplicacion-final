import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Validators, FormGroup, FormControl } from '@angular/forms';

import { AngularFireModule, AuthMethods, FirebaseListObservable, AngularFire } from 'angularfire2';

import { GestUs } from '../gestUs/gestUs'

import firebase from 'firebase';
import { ToastController } from 'ionic-angular'
import { MyApp } from '../../app/app.component'

@Component({
  selector: 'page-verUs',
  templateUrl: 'verUs.html'
})
export class VerUs {

  usersRef: any = firebase.database().ref('Usuarios');

  ab: boolean;
  notificaciones: boolean;
  datos:any;
  usuarios: FirebaseListObservable<any>;
  usuario: FirebaseListObservable<any>;

    us: any;
    dni: any;
    telefono: any;
    abonado: any;
    nivel: any;
    noti: any;
    nombre: any;
    user: any;
    ref: any;
    usactual: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public af: AngularFire,
              public toastCtrl: ToastController
              ) 
  {

    
    this.us = this.navParams.get('us');
    this.nombre = this.navParams.get('nombre');
    this.dni = this.navParams.get('dni');
    this.telefono = this.navParams.get('telefono');
    this.abonado = this.navParams.get('abonado');
    this.nivel = this.navParams.get('nivel');
    this.noti = this.navParams.get('noti');
    this.ref = this.navParams.get('referencia')
    //console.log(this.user.uid);

    this.usuarios = this.af.database.list('/Usuarios');
    this.user = firebase.auth().currentUser;
    this.usuario = this.af.database.list('/Usuarios', {
        query: {
            orderByChild: 'uid',
            equalTo: this.user.uid
        }
    });
  }

  ngOnInit() {
    this.datos = new FormGroup({
        nombre: new FormControl(this.navParams.get('nombre')),
        dni: new FormControl(this.navParams.get('dni')),
        telefono: new FormControl(this.navParams.get('telefono')),
        abonado: new FormControl(this.navParams.get('abonado')),
        nivel: new FormControl(this.navParams.get('nivel')),
        notificaciones: new FormControl(this.navParams.get('noti')),
    })
    //console.log(this.datos);
  }

  guardar(){
    let d = this.datos.value;

    this.ref.update({
      nombre: d.nombre,
      dni: d.dni,
      telefono: d.telefono,
      abonado: d.abonado,
      nivelJuego: d.nivel,
    })
    this.navCtrl.push(MyApp); 
  }

  eliminar(){
    this.usuario.subscribe(items => {
      items.forEach(us => {
        this.usuarios.remove(us);
        this.navCtrl.push(MyApp);
      })
    })
  }

  cancelar(){
    this.navCtrl.push(MyApp);
  }

  
}
