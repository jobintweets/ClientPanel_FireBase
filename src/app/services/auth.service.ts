import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable , of} from 'rxjs' ;
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth ) {   }

  login(email: string, password: string) {
    return new Promise((resolve , reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(userData => resolve(userData) , err => reject(err));
      // returning a promise from our promise
});
}
ifLogged() {
  return this.afAuth.authState.pipe(map(auth => auth));
}
logout() {
  this.afAuth.auth.signOut();

}
register(email: string , password: string) {
  return new Promise((resolve , reject) => {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then(userData => resolve(userData) , err => reject(err));
    // returning a promise from our promise
});

}
}
