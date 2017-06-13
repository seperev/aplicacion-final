import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Validators, FormGroup, FormControl } from '@angular/forms';

import { AngularFireModule, AuthMethods, FirebaseListObservable, AngularFire } from 'angularfire2';
 
import { AuthProvider } from '../../providers/auth-provider'
import { MyApp } from '../../app/app.component'

import firebase from 'firebase';
import { ToastController } from 'ionic-angular'

@Component({
  selector: 'page-datosPersonales',
  templateUrl: 'datosPersonales.html'
})
export class DatosPersonales {

  usersRef: any = firebase.database().ref('Usuarios');
  user:any;

  abonado: any;
  datos:any;
  usuarios: FirebaseListObservable<any>;
  usuario: FirebaseListObservable<any>;
  
  nom = "";
  dn = "";
  tel = "";
  ni = "";
  nomus = "";

  referencia: any;

  

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public af: AngularFire,
              public auth: AuthProvider,
              public toastCtrl: ToastController
              ) 
  {
    this.usuarios = af.database.list('/Usuarios');
    this.user = firebase.auth().currentUser;
    this.usuario = this.af.database.list('/Usuarios', {
        query: {
            orderByChild: 'uid',
            equalTo: this.user.uid
        }
    });

    this.usuario.subscribe(items =>{
      items.forEach(u => {
        this.nom = u.nombre,
        this.dn = u.dni,
        this.tel = u.telefono,
        this.ni = u.nivel,
        this.referencia = firebase.database().ref('Usuarios/' + u.$key),
        this.nomus = u.usuario
      })
      console.log('Ahora entra para llenar los datos del usuario');
        this.datos = new FormGroup({
          nombre: new FormControl(this.nom),
          dni: new FormControl(this.dn),
          telefono: new FormControl(this.tel),
          nivel: new FormControl(this.ni),
          usuario: new FormControl(this.nomus)
      })
    })
  }


  ngOnInit() {

    let dat: any;
    let terminado = false;
    
    this.datos = new FormGroup({
        nombre: new FormControl(this.nom),
        dni: new FormControl(this.dn),
        telefono: new FormControl(this.tel),
        nivel: new FormControl(this.ni),
        usuario: new FormControl(this.nomus)
    })
    
    console.log(this.datos);
  }

  guardar(dat){

    let encontrado = false;
    let terminado = false;

    let d = this.datos.value;
    let niv = document.getElementById('nivel');
    let ab = document.getElementById('abonado');
    let nom = document.getElementById('dni');

    console.log('datos al pulsar el boton',this.datos);

    this.usuarios.subscribe(items => {
      items.forEach(u => {
        if(u.usuario == d.usuario){
          let toast = this.toastCtrl.create({
                message: 'El nombre de usuario ya existe',
                duration: 3000
              });
              toast.present();
              encontrado = true;
        }
        terminado = true;
      })

      if(terminado){
        if(!encontrado){
          this.referencia.update({
                nombre: d.nombre,
                dni: d.dni,
                telefono: d.telefono,
                abonado: ab.lastChild.attributes.item(6).nodeValue,
                nivelJuego: d.nivel,
                usuario: d.usuario
          })
          this.navCtrl.push(MyApp);
        }
      }
    })

  }

  actualizarAbonado(){
    let ab = document.getElementById('abonado');
    this.abonado = ab.lastChild.attributes.item(6).nodeValue;
  }

  cancelar(){
      this.navCtrl.push(MyApp);
  }
}
