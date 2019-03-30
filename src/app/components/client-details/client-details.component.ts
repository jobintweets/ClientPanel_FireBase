import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute , Params} from '@angular/router';
import {ClientService} from '../../services/client.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Client} from '../../models/Client';
@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
user_id: string;
id: string;
client: Client;
hasBalance: Boolean = false;
showBalanceUpdateInput: Boolean = false;
  constructor(
    private clientservice: ClientService ,
    private router: Router,
    private route: ActivatedRoute,
   private flashMessage: FlashMessagesService) {
    }

   ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.user_id = params.get('id');
     });
    console.log(this.user_id);
this.clientservice.getClient(this.user_id).subscribe(result => {
  if (result != null) {
    if (result.balance > 0) {
      this.hasBalance = true;

    }
  }
  this.client = result;
  console.log(this.client);
});

 }
 updateBalance( ) {
this.clientservice.updateClientDetails(this.client);
this.flashMessage.show('Balance Updated', {
  cssClass: 'alert-success', timeout: 4000
}
);
 }
 onDeleteClick() {
   console.log('deleted');
   if(confirm('are you sure')) {
this.clientservice.deleteClient(this.client);
this.flashMessage.show('Client Removed', {
  cssClass: 'alert-success', timeout: 4000
}
);
this.router.navigate(['/']);
   } else {
    this.flashMessage.show('Failed To Remove', {
      cssClass: 'alert-danger', timeout: 4000
    }
    );
   }
 }
}