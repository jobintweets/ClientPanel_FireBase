import { Injectable } from '@angular/core';
import {AngularFirestore , AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
// collection-> fetching all the clients
// document -> fetching a single client
import { Observable , of} from 'rxjs' ;
import {Client} from '../models/Client';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clientsCollection: AngularFirestoreCollection<Client>;
clientDoc: AngularFirestoreDocument<Client>;
clients: Observable<Client[]>;
client: Observable<Client>;
  constructor(private afs: AngularFirestore) {
    this.clientsCollection = this.afs.collection('clients', ref => ref.orderBy('lastName', 'asc'));
    // we are ascendingily ordering it by the lastName
  }
  // fetching all clients from the firestore
  getClients(): Observable<Client[]> {
// get clients by id
this.clients = this.clientsCollection.snapshotChanges().pipe(
  map (changes => {
    return changes.map(action => {
      const data = action.payload.doc.data() as Client;
      data.id = action.payload.doc.id;
      return data;
    });
  })
  // first maps closes above

);

return this.clients;
  }
  newClient(value: Client ) {
  this.clientsCollection.add(value);
  }

  // fetching an individual client based on id
  getClient(id: any): Observable<Client> {
    this.clientDoc = this.afs.doc<Client>(`clients/${id}`);
    this.client = this.clientDoc.snapshotChanges().pipe(
      map(action => {
        if (action.payload.exists === false) {
          return null;
        } else {
            const data = action.payload.data() as Client ;
            data.id = action.payload.id;
            return data;
        }

      })
    );

    return this.client;

  }
  // updating a clients balance
  updateClientDetails(client: Client) {
    this.clientDoc = this.afs.doc(`clients/${client.id}`);
    this.clientDoc.update(client);
  }
  deleteClient(client: Client) {
    this.clientDoc = this.afs.doc(`clients/${client.id}`);
    this.clientDoc.delete();
  }
}
