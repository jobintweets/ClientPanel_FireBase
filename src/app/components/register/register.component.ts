import { Component, OnInit } from '@angular/core';
import {AuthService } from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;
  constructor(private authservice: AuthService ,
    private flashMessage: FlashMessagesService,
  private router: Router ) { }

  ngOnInit() {
  }
  onSubmit() {
    this.authservice.register(this.email, this.password).then(result => { 
      this.flashMessage.show('you are regisrerd and logged in', { cssClass : 'alert-success', timeout: 4000});
this.router.navigate(['/']);
    })
    .catch(error => {
  this.flashMessage.show(error.message, { cssClass : 'alert-danger', timeout: 4000
      });
    });
}

}
