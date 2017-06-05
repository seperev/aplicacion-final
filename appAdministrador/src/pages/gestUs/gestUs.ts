import { Component } from '@angular/core';

import {AngularFire, FirebaseListObservable, AuthProviders, AuthMethods} from 'angularfire2';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';


import { VerUs } from '../gestUs/verUs';
import { Registro } from '../registro/registro'

import firebase from 'firebase';


@Component({
  selector: 'page-gestUs',
  templateUrl: 'gestUs.html'
})
export class GestUs {

  
  usuarios: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController,  
              public alertCtrl: AlertController, public af: AngularFire, 
              public actionSheetCtrl: ActionSheetController
              ) {    
                  this.usuarios = this.af.database.list('/Usuarios');
  }

  verUsuario(u, clave){
    let us = u.usuario;
    let nombre = u.nombre;
    let dni = u.dni;
    let telefono = u.telefono;
    let abonado = u.abonado;
    let nivel = u.nivel;
    let notificaciones = u.notificaciones;
    let ref = firebase.database().ref('Usuarios/' + clave);

    this.navCtrl.push(VerUs, {
      us: us,
      nombre: nombre,
      dni: dni,
      telefono: telefono,
      abonado: abonado,
      nivel: nivel,
      noti: notificaciones,
      referencia: ref
    })
  }

  crearUsuario(){
    this.navCtrl.push(Registro);
  }

}
