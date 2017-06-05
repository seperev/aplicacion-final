import { Component } from '@angular/core';

//import { NavController } from 'ionic-angular';

import {AngularFire, FirebaseListObservable, AuthProviders, AuthMethods} from 'angularfire2';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';

import firebase from 'firebase';

import { VerReserva } from '../partidosAbiertos/verReserva'


@Component({
  selector: 'page-partidosAbiertos',
  templateUrl: 'partidosAbiertos.html'
})
export class PartidosAbiertos {

  fechaCorta: string = new Date().toISOString();
  fecha: string = this.fechaCorta;
  minFecha: string = (new Date().getFullYear()-5).toString();
  maxFecha: string = (new Date().getFullYear()+3).toString();
  reservasRef: any = firebase.database().ref('Reservas');
  res: any;

  user: any;
  abonado: any;
  us: any;

  constructor(public navCtrl: NavController,  
              public alertCtrl: AlertController, public af: AngularFire, 
              public actionSheetCtrl: ActionSheetController
              ) {

                this.res = af.database.list('/Reservas', {
                    query: {
                        orderByChild: 'completo',
                        equalTo: false
                    }
                })

                this.user = firebase.auth().currentUser; 
                this.us = af.database.list('/Usuarios', {
                  query: {
                    orderByChild: 'uid',
                    equalTo: this.user.uid
                  }
                }); 
                this.us.subscribe(items => {
                    items.forEach(u => {
                        this.abonado = u.abonado
                    })
                    console.log(this.abonado);
                });
  }

    verDia(fecha){
    console.log(fecha);
    console.log(this.res);
    
    this.res = this.af.database.list('/Reservas', {
      query: {
        orderByChild: 'dia',
        equalTo: this.fecha.substr(0,10)
      }
    });


    
  }


  verReserva(r){
    let nombre = r.nombre;
    let inicio = r.horaInicio;
    let fin = r.horaFin;
    let pista = r.nombrePista;
    let usuario = r.usuario;
    let dia = r.dia;
    let uid = r.uid;
    let ab = r.abonados;
    let noab = r.noabonados;
   

    this.navCtrl.push(VerReserva, {
      nombre: nombre,
      inicio: inicio,
      fin: fin,
      pista: pista,
      usuario: usuario,
      dia: dia,
      uid: uid,
      abonado: this.abonado,
      ab: ab,
      noab: noab
    })
  }
  


}
