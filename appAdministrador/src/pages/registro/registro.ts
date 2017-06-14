import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Validators, FormGroup, FormControl } from '@angular/forms';

import { AngularFireModule, AuthMethods, FirebaseListObservable, AngularFire } from 'angularfire2';
 
import { AuthProvider } from '../../providers/auth-provider'

import { ToastController } from 'ionic-angular'
import { Reservas } from '../reservas/reservas'
import { MyApp } from '../../app/app.component'

@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html'
})
export class Registro {

  booleanos: any;
  loginForm:any;
  ab: boolean;
  login:any;
  usuarios: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              af: AngularFire,
              public auth: AuthProvider,
              public toastCtrl: ToastController
              ) 
  {
    this.usuarios = af.database.list('/Usuarios');
    this.booleanos = {
      ab: false
    }
  }

  ngOnInit() {

    this.loginForm = new FormGroup({
        email: new FormControl("",[Validators.required]),
        password: new FormControl("",Validators.required),
        
    });
    this.login = new FormGroup({
        usuario: new FormControl(""),
        nombre: new FormControl(""),
        dni: new FormControl(""),
        telefono: new FormControl(""),
        nivel: new FormControl(""),
    })
  }

  cancelar(){
    this.navCtrl.push(MyApp);
  }

  createAccount() {
    let datos = this.login.value;
    let encontrado = false;
    let terminado = false;
    let creado = false;
    this.usuarios.subscribe(items => {
      items.forEach(usuario => {
        if(usuario.usuario == datos.usuario){
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
      console.log("he entrado");
      let credentials = this.loginForm.value;
      
      let ab = document.getElementById('abonado');
      console.log(ab.lastChild.attributes.item(6).nodeValue);


      this.auth.createAccount(credentials)
      .then((data) => {
        console.log("uid: ",data.uid);
        this.usuarios.push({
                uid: data.uid,
                nombre: datos.nombre,
                dni: datos.dni,
                telefono: datos.telefono,
                abonado: ab.lastChild.attributes.item(6).nodeValue,
                nivelJuego: datos.nivel,
                usuario: datos.usuario
              });
        this.navCtrl.push(MyApp);
        //creado = true;

      }, (error) => {
        if(error.message == 'The email address is badly formatted.'){
          let toast = this.toastCtrl.create({
            message: 'Introduce un email correcto',
            duration: 3000
          });
          toast.present();
        }
        else if(error.message == 'Password should be at least 6 characters'){
          let toast = this.toastCtrl.create({
            message: 'La contraseña tiene que tener un mínimo de 6 caracteres',
            duration: 3000
          });
          toast.present();
        }
        else if(error.message == 'The email address is already in use by another account.'){
          let toast = this.toastCtrl.create({
            message: 'Este email ya esta en uso',
            duration: 3000
          });
          toast.present();
        }
        console.log(error.message); 
        creado = false;
      });
/*
      if(creado){
        this.navCtrl.push(MyApp);
      }*/
      }
    }
    
    creado = true;
  });
    /*
    if(creado){
        this.navCtrl.push(Reservas);
    }*/
  };
}
