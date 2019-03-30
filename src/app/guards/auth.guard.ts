import {Injectable} from '@angular/core';
import {CanActivate , Router} from '@angular/router';
import {AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private  router: Router,
        private  afAuth: AngularFireAuth
          ) { }
          canActivate(): Observable<boolean> {
              return this.afAuth.authState.pipe(map(loggedin => {
                  if (!loggedin) {
                      this.router.navigate(['/login']);
                      return false;
                  } else {
                      return true;
                  }
              })
            );
          }
}