import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute , Params} from '@angular/router';
import {ClientService} from '../../services/client.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Client} from '../../models/Client';
import {SettingsService} from '../../services/settings.service';
@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
id: string;
client: Client = {
  firstName: '',
  lastName: '',
  email : '',
  phone: '',
  balance: 0
};
 disableBalanceOnEdit: Boolean ;
  constructor(
    private clientservice: ClientService ,
    private router: Router,
    private route: ActivatedRoute,
   private flashMessage: FlashMessagesService,
   private settingsservice: SettingsService,
  ) { }

  ngOnInit() {
    this.disableBalanceOnEdit = this.settingsservice.getSettings().disableBalanceOnEdit;
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
     });
    console.log(this.id);
this.clientservice.getClient(this.id).subscribe(result => {
  this.client = result;
  console.log(this.client);
});
  }


   onSubmit({value, valid}: {value: Client, valid: Boolean}) {
     console.log(value);
     value.id = this.id;
     if (!valid) {
this.flashMessage.show('Please fill out the form properly',
{
cssClass: 'alert-danger' , timeout: 4000
});
     } else {
      this.clientservice.updateClientDetails(value);
      this.flashMessage.show('Client Details Updated',
      {
      cssClass: 'alert-success' , timeout: 4000
      });
this.router.navigate(['/client/' + this.id]);
     }

   }

}
