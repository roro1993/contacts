import { Component, OnInit } from '@angular/core';
import { ContactlistService } from '../contactlist.service';
import { Contact } from '../contact';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
	
  public contact_list = [];
  public contact_view = [];
  public contact_form_title = '';
	public messages = '';
  public contact_modal = [];

  // constructor() { }
  constructor(private _contactlistService: ContactlistService) { }



  ngOnInit() {
    // gets called once component is initialized
    this._contactlistService.getContactList()
      .subscribe(data => {
        this.contact_list = data;
        this.contact_modal = new Contact();
      });
  }


  bootstrapModal(modal_id, action) {
    switch(action){
      case 'open':
      default: 
        $(modal_id).modal();
        break;
      case 'close':
        $(modal_id).modal('hide');
    }
  }


  refreshList(){
    this._contactlistService.getContactList().subscribe(data => {
      this.contact_list = data;
    });
  }

  deleteContact(cid) {
    if (confirm("Would you like to delete this contact?")) {

      this._contactlistService.deleteContact(cid)
      .subscribe(
        // after deleting the contact
        // refresh the list
        data => {
           // refresh the list
          this.refreshList();
          this.messages = "<div class='message message-success'>Contact deleted successfully!</div>";
         },
         error => {
           this.messages = "<div class='message message-error'>Could not delete contact!</div>";
         }
      );
    }
  }

  transformObjValsToInstance(object, instance){
    for (var key in instance) {
      if (object.hasOwnProperty(key)) {
        instance[key] = object[key];
      }
    }
    return instance;
  }

  viewContact(cid, modal_id){
    //load the contact of id cid and populate the corresponding array
    this._contactlistService.viewContact(cid)
      .subscribe(data => {
        this.contact_view = data;
        this.contact_modal = this.transformObjValsToInstance(this.contact_view , this.contact_modal);
      }); 

    // open the view modal
    this.bootstrapModal(modal_id, 'open');
  }

  getContact(cid, title_form, modal_id){
    this.contact_form_title = title_form;
    //load the contact of id cid and populate the corresponding array
    this.viewContact(cid, modal_id);
  }

  addContact(title_form , modal_id){
    this.contact_form_title = title_form;
    this.contact_view = [];
    this.contact_modal = new Contact();

    this.bootstrapModal(modal_id, 'open');
  }

  saveContact(data, invalid, modal_id){
    if(invalid == true) return;
    // form has been filled..
    if(data.id == ""){
      // adding contact
      this._contactlistService.createContact(data)
      .subscribe(data => {
        this.refreshList();
      }); 

    }else{
      // editing contact
      // adding contact
      this._contactlistService.updateContact(data)
      .subscribe(data => {
        this.refreshList();
      }); 
    }
    this.bootstrapModal(modal_id, 'close');
  }

}