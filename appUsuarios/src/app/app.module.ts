import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { Reservas } from '../pages/reservas/reservas';
import { Registro } from '../pages/registro/registro'
import { Reservar } from '../pages/reservar/reservar'
import { MisReservas } from '../pages/misReservas/misReservas'
import { DatosPersonales } from '../pages/datosPersonales/datosPersonales'
import { PartidosAbiertos } from '../pages/partidosAbiertos/partidosAbiertos'
import { VerReserva } from '../pages/partidosAbiertos/verReserva'

import { Auth } from '../pages/autenticacion/autenticacion';
import { AuthProvider } from '../providers/auth-provider';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

export const firebaseConfig = {
    apiKey: "AIzaSyDHaNLG_s3KpZqHc5y7G_kWJ9l99LDUC04",
    authDomain: "padel-56238.firebaseapp.com",
    databaseURL: "https://padel-56238.firebaseio.com",
    projectId: "padel-56238",
    storageBucket: "padel-56238.appspot.com",
    messagingSenderId: "172184786731"

};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}

@NgModule({
  declarations: [
    MyApp,
    Auth,
    Reservas,
    Registro,
    Reservar,
    MisReservas,
    DatosPersonales,
    PartidosAbiertos,
    VerReserva
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Auth,
    Reservas,
    Registro,
    Reservar,
    MisReservas,
    DatosPersonales,
    PartidosAbiertos,
    VerReserva
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider
  ]
})
export class AppModule {}
