import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Contact } from './models';
import { CONTACTS_MOCK } from './mock';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contacts = this.sort(CONTACTS_MOCK) as Contact[];

  loadList$ = new BehaviorSubject(true);
  contacts$ = this.loadList$.pipe(map(() => this.sort(this.contacts)));

  selected$ = new BehaviorSubject<Contact>(this.contacts[0]);

  isEditing$ = new BehaviorSubject(false);
  isAdding$ = new BehaviorSubject(false);


  sort(contacts: Contact[]): Contact[] {
    return contacts.sort((a, b) => {
      if (a.lastName > b.lastName) {
        return 1;
      } else if (a.lastName < b.lastName) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  select(contact: Contact): void {
    this.selected$.next(contact);
    this.isAdding$.next(false);
    this.isEditing$.next(false);
  }

  add(newContact: Contact): void {
    newContact.id = new Date().getTime().toString();
    newContact = this.formatName(newContact);
    this.contacts = [...this.contacts, newContact];
    this.isAdding$.next(false);
    this.selected$.next(newContact);
    this.loadList$.next(true);
  }

  edit(editedContact: Contact): void {
    this.contacts = this.contacts.filter(contact => contact.id !== editedContact.id);
    editedContact = this.formatName(editedContact);
    this.contacts = [...this.contacts, editedContact];
    this.isEditing$.next(false);
    this.selected$.next(editedContact);
    this.loadList$.next(true);
  }

  delete(contactToBeDeleted: Contact): void {
    this.contacts = this.contacts.filter(contact => contact.id !== contactToBeDeleted.id);
    this.contacts = this.sort(this.contacts);
    this.isEditing$.next(false);
    this.loadList$.next(true);
    this.selected$.next(this.contacts[0]);
  }

  formatName(contact: Contact): Contact {
    const { firstName, lastName } = contact;
    return {
      ...contact,
      firstName: firstName.charAt(0).toUpperCase() + firstName.substr(1).toLocaleLowerCase(),
      lastName: lastName.charAt(0).toUpperCase() + lastName.substr(1).toLocaleLowerCase(),
    };
  }
}
