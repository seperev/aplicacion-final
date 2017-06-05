import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Validators, FormGroup, FormControl } from '@angular/forms';

import { AngularFireModule, AuthMethods, FirebaseListObservable, AngularFire } from 'angularfire2';
 
import { AuthProvider } from '../../providers/auth-provider'

import { ToastController } from 'ionic-angular'
import { Reservas } from '../reservas/reservas'
import { MyApp } from '../../app/app.component'

@Component({
  selector: 'page-crearPista',
  templateUrl: 'crearPista.html'
})
export class CrearPista {

  form:any;
  ab: boolean;
  pistas: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              af: AngularFire,
              public auth: AuthProvider,
              public toastCtrl: ToastController
              ) 
  {
    this.pistas = af.database.list('/Pistas');
  }

  ngOnInit() {

    this.form = new FormGroup({
        nombre: new FormControl(""),
        descripcion: new FormControl(""),
        
    });
  }

  crearPista() {
    let datos = this.form.value;
    let encontrado = false;
    let terminado = false;

    this.pistas.subscribe(items => {
      items.forEach(pista => {
        if(pista.nombre == datos.nombre){
              let toast = this.toastCtrl.create({
                message: 'Ya existe una pista con este nombre',
                duration: 3000
              });
              toast.present();
              encontrado = true;
        }
        
        terminado = true;
      })
      

      if(terminado){
        if(!encontrado){
            
            this.pistas.push({
                nombre: datos.nombre,
                descripcion: datos.descripcion
            });
            this.navCtrl.push(MyApp);
            
        }
      }
    
  });
  }
}
