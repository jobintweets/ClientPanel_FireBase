import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute , Params} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Client} from '../../models/Client';
import {SettingsService} from '../../services/settings.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: Boolean;
  loggedInUser: string;
  showRegister: Boolean;

  constructor(
    private authservice: AuthService ,
    private router: Router,
    private route: ActivatedRoute,
   private flashMessage: FlashMessagesService ,
   private settingsservice: SettingsService
  ) { }

  ngOnInit() {
    this.authservice.ifLogged().subscribe(loggedin => {
      if (loggedin) {
        this.isLoggedIn = true;
this.loggedInUser = loggedin.email;
      } else {
        this.isLoggedIn = false;
      }
    });
    this.showRegister = this.settingsservice.getSettings().allowRegistraton;
  }
  onLogOutClick() {
    this.authservice.logout();
    this.isLoggedIn = false;
    this.flashMessage.show('you are now logged out' , {
      cssClass : 'alert-success' , timeout: 4000
    });
    this.router.navigate(['login']);
   }

}
