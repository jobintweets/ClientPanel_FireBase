import { Component, OnInit } from '@angular/core';
import {AuthService } from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
email: string;
password: string;
  constructor(private authservice: AuthService ,
    private flashMessage: FlashMessagesService,
  private router: Router ) { }

  ngOnInit() {
    this.authservice.ifLogged().subscribe(loggedin => {
      if (loggedin) {
        this.router.navigate(['/']);

      }
    });
  }
  onSubmit() {
    this.authservice.login(this.email, this.password)
    .then(response => {
      this.flashMessage.show('you are logged in', { cssClass : 'alert-success', timeout: 4000
      });
      console.log(response);
      this.router.navigate(['/']);
    })
    .catch(err => {
      console.log(err);
      this.flashMessage.show(err.message, { cssClass : 'alert-danger', timeout: 4000
      });
      this.router.navigate(['login']);
    });
  }
}
