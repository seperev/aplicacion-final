import { Component } from '@angular/core';

import {AngularFire, FirebaseListObservable, AuthProviders, AuthMethods} from 'angularfire2';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth-provider';
import { Reservar } from '../reservar/reservar';

import firebase from 'firebase';

@Component({
  selector: 'page-reservas',
  templateUrl: 'reservas.html'
})
export class Reservas {

  
  usuarios: FirebaseListObservable<any>;
  reservas: FirebaseListObservable<any>;
  pistas: FirebaseListObservable<any>;
  loginForm:any;
  res:any;

  a = [];
  pi = [];
  fechaCorta: string = new Date().toISOString();
  fecha: string = this.fechaCorta;
  minFecha: string = (new Date().getFullYear()-5).toString();
  maxFecha: string = (new Date().getFullYear()+3).toString();
  reservasRef: any = firebase.database().ref('Reservas');
  user:any;

  constructor(public navCtrl: NavController,  
              public alertCtrl: AlertController, public af: AngularFire, 
              public actionSheetCtrl: ActionSheetController, 
              public auth:AuthProvider,
              ) {

    this.usuarios = af.database.list('/Usuarios');
    let usuarioscargados = false;
    this.reservas = af.database.list('/Reservas');
    let reservascargadas = false;
    this.pistas = af.database.list('/Pistas');
    let pistascargadas = false;
    this.res = af.database.list('/Reservas', {
      query: {
        orderByChild: 'dia',
        equalTo: this.fecha.substr(0,10)
      }
    });    
    let rescargadas = false;

    this.usuarios.subscribe(items => {
      usuarioscargados = true;
      if(usuarioscargados && reservascargadas && pistascargadas && rescargadas){
        console.log('todo cargado');
        this.mostrarReservas();
      }
    });
    this.reservas.subscribe(items => {
      reservascargadas = true;
      if(usuarioscargados && reservascargadas && pistascargadas && rescargadas){
        console.log('todo cargado');
        this.mostrarReservas();
      }
    });
    this.pistas.subscribe(items => {
      pistascargadas = true;
      if(usuarioscargados && reservascargadas && pistascargadas && rescargadas){
        console.log('todo cargado');
        this.mostrarReservas();
      }
    });
    this.res.subscribe(items => {
      rescargadas = true;
      if(usuarioscargados && reservascargadas && pistascargadas && rescargadas){
        console.log('todo cargado');
        this.mostrarReservas();
      }
    })    
  }

  reservar(e){
    let elemento = event.srcElement;
    let padre = elemento.parentElement;
    let hora = padre.id;
    let nompista = elemento.textContent.replace(/(^\s*)|(\s*$)/g,""); //el .replace elimina los espacios en blanco

    this.navCtrl.push(Reservar, {
      hora: hora,
      pista: nompista,
      dia: this.fecha.substr(0,10)
    })

  }

  mostrarReservas(){
    this.a = [];
    let horas = ['10','11','12','13','14','15','16','17','18','19','20','21'];
    this.pi = [];
    let n=0;
    this.pistas.subscribe(items => {
      items.forEach(pista => {
        n++;
        this.pi.push(pista.nombre)
      });
      for(let i = 0; i < horas.length; i++){
        let f = [];
        for(let t = 0; t < this.pi.length; t++){
          f.push(this.pi[t]);
        }
        this.a.push({clave:horas[i], valor:f});
      } 
    })

    //Ahora elimino las pistas que estan reservadas de las horas reservadas
    var t = 0;
    
    this.res.subscribe(items => {
    items.forEach(reserva => {
      if(reserva != null){
      for(var j = 0; j < this.a.length; j++){
        if(reserva.horaInicio == this.a[j].clave){
          var indice = this.a[j].valor.indexOf(reserva.nombrePista);
          if(indice > -1){

            //Con la siguiente linea elimino la pista que está reservada
            this.a[j].valor.splice(indice,1);
            
          }
        }
      }
      }
    });
    });
  }

  verDia(fecha){ 
    this.res = this.af.database.list('/Reservas', {
      query: {
        orderByChild: 'dia',
        equalTo: this.fecha.substr(0,10)
      }
    });

    this.pistas.forEach(pista => {
      this.pi = [];
      this.pi.push(pista[0].nombre);
      this.mostrarReservas();
      });
  }

  logout(){
    this.auth.logout();
  }
}
