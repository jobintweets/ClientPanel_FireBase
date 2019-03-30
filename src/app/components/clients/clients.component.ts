import { Component, OnInit, EventEmitter , Output , Input } from '@angular/core';
import {ClientService} from '../../services/client.service';
import {Client} from '../../models/Client';
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
 
clients: Client[];
totalOwed = 0;
  constructor(private clientservice: ClientService ) { }

  ngOnInit() {
    this.clientservice.getClients().subscribe(results => {
      console.log(results);
      this.clients = results;
      this.getTotalOwed();
    });
    }

    getTotalOwed() {
      this.totalOwed = this.clients.reduce((oldtot, iterator) => {
        return oldtot + parseFloat(iterator.balance.toString());
      }, 0);
    }
    
}
