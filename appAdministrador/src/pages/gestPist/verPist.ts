import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Validators, FormGroup, FormControl } from '@angular/forms';

import { AngularFireModule, AuthMethods, FirebaseListObservable, AngularFire } from 'angularfire2';

import { GestUs } from '../gestUs/gestUs'

import firebase from 'firebase';
import { ToastController } from 'ionic-angular'
import { MyApp } from '../../app/app.component'

@Component({
  selector: 'page-verPist',
  templateUrl: 'verPist.html'
})
export class VerPist {

  //usersRef: any = firebase.database().ref('Usuarios');

  datos:any;
  pistas: FirebaseListObservable<any>;
  pista: FirebaseListObservable<any>;

    nombre: any;
    ref: any;
    descripcion: any;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public af: AngularFire,
              public toastCtrl: ToastController
              ) 
  {
    
    this.nombre = this.navParams.get('nombre');
    this.ref = this.navParams.get('referencia');
    this.descripcion = this.navParams.get('descripcion');


    this.pistas = this.af.database.list('/Pistas');
    this.pista = this.af.database.list('/Pistas', {
        query: {
            orderByChild: 'nombre',
            equalTo: this.nombre
        }
    });

  }

  ngOnInit() {
    this.datos = new FormGroup({
        nombre: new FormControl(this.navParams.get('nombre')),
        descripcion: new FormControl(this.navParams.get('descripcion'))
    })
  }

  eliminar(){
    this.pista.subscribe(items => {
      items.forEach(p => {
        this.pistas.remove(p);
        this.navCtrl.push(MyApp);
      })
    })
  }

  cancelar(){
    this.navCtrl.push(MyApp);
  }

  
}
