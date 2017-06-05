import { Injectable } from '@angular/core';

import { AngularFire } from 'angularfire2';

@Injectable()
export class AuthProvider{
  constructor(public af:AngularFire) {}
  
  //Obtiene el id creado para cada usuario al registrarlo en la aplicacion
  getCurrentUid(){
    return this.af.auth.getAuth().auth.uid;
  }

  //Sirve para autenticarse dentro de la aplicación mediante usuario y contraseña
  signin(credentails) {   
    return this.af.auth.login(credentails);
  }
  
  //Crea un nuevo usuario dentro de la aplicación con usuario y contraseña
  createAccount(credentails) {
    return this.af.auth.createUser(credentails);
  };
  
  //Cierra la sesión del usuario
  logout() {
     this.af.auth.logout();
  }

}