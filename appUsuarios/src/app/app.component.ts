import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Auth } from '../pages/autenticacion/autenticacion';
import { AngularFire} from 'angularfire2';
import { AuthProvider } from '../providers/auth-provider';

import { Reservas } from '../pages/reservas/reservas';
import { MisReservas } from '../pages/misReservas/misReservas';
import { DatosPersonales } from '../pages/datosPersonales/datosPersonales';
import { PartidosAbiertos } from '../pages/partidosAbiertos/partidosAbiertos'



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Reservas;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar,
    public af: AngularFire, public authProvider:AuthProvider, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Reservas', component: Reservas },
      { title: 'Mis reservas', component: MisReservas },
      { title: 'Datos personales', component: DatosPersonales},
      { title: 'Partidos abiertos', component: PartidosAbiertos}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.af.auth.subscribe(auth => {
        if(auth) {
           this.rootPage = Reservas;
        } else {
           this.rootPage = Auth;
        }
     });
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
