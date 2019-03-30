import {Injectable} from '@angular/core';
import {CanActivate , Router} from '@angular/router';
import {AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import {SettingsService} from '../services/settings.service';
import { map, catchError } from 'rxjs/operators';
@Injectable()
export class RegisterGuard implements CanActivate {
    constructor(
        private  router: Router,
    private settingsservice: SettingsService
          ) { }
          canActivate(): boolean {
           if (this.settingsservice.getSettings().allowRegistraton) {
return true;
           } else {
this.router.navigate(['login']);
return false;
           }
          }
}