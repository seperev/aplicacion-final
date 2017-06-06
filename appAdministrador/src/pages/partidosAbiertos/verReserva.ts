import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Validators, FormGroup, FormControl } from '@angular/forms';

import { AngularFireModule, AuthMethods, FirebaseListObservable, AngularFire } from 'angularfire2';

import { MyApp } from '../../app/app.component';
import firebase from 'firebase';

@Component({
  selector: 'page-verReserva',
  templateUrl: 'verReserva.html'
})
export class VerReserva {

  usersRef: any = firebase.database().ref('Usuarios');
  //user:any;

  reservas: FirebaseListObservable<any>;
  
    uid:any;
    nombre: any;
    inicio: any;
    pista: any;
    usuario: any;
    dia: any;
    reserva: FirebaseListObservable<any>;
    referencia: any;
    user: any;
    abonado: any;
    us: any;
    numabonados: any;
    numnoabonados: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public af: AngularFire,
              ) 
  {
    

    this.abonado = this.navParams.get('abonado');
    console.log(this.abonado);

    this.reservas = af.database.list('/Reservas');

    this.nombre = this.navParams.get('nombre');
    this.inicio = this.navParams.get('inicio');
    this.pista = this.navParams.get('pista');
    this.usuario = this.navParams.get('usuario');
    this.dia = this.navParams.get('dia');
    this.uid = this.navParams.get('uid');

    this.reserva = this.af.database.list('/Reservas', {
        query: {
            orderByChild: 'uid',
            equalTo: this.uid
        }
    })
    this.reserva.subscribe(items => {
        items.forEach(r => {
            this.referencia = firebase.database().ref('Reservas/' + r.$key),
            this.numabonados = r.abonados,
            this.numnoabonados = r.noabonados
        })
    })

  }

  unirse(){
    console.log(this.abonado);
    let completado = false;

    if((parseInt(this.numabonados) + parseInt(this.numnoabonados) + 1) >= 4){
        completado = true;
    }


    if(this.abonado){
        if(completado){
            this.referencia.update({
                abonados: parseInt(this.numabonados) + 1,
                completo: true
            })
        }
        else{
            this.referencia.update({
                abonados: parseInt(this.numabonados) + 1
            })
        }
    }
    else{
        if(completado){
            this.referencia.update({
                noabonados: parseInt(this.numnoabonados) + 1,
                completo: true
            })
        }
        else{
            this.referencia.update({
                noabonados: parseInt(this.numnoabonados) + 1
            })
        }
    }


    this.navCtrl.push(MyApp);
  }

  
}
