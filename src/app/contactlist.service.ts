import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IContact } from './contactlist';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root', // to inject a service into another service
})

export class ContactlistService {

	private _url: string = "http://localhost:8000/contacts/"; 

  constructor(private http: HttpClient) {}

  getContactList(): Observable<IContact[]>{
		return this.http.get<IContact[]>(this._url);
  }

  viewContact(cid): Observable<IContact[]>{
    return this.http.get<IContact[]>(this._url + cid);
  }

	createContact(contact) {
		return this.http.post(this._url, contact);
	}

  updateContact(contact) {  
   	return this.http.post(this._url + 'update/' + contact.id, contact);
  }


  deleteContact(cid){
   	return this.http.post(this._url + 'delete/' + cid);
  }

}
