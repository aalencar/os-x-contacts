import { Component } from '@angular/core';
import { Category, Contact } from 'src/app/models';
import { ContactService } from 'src/app/contact.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent {

  categories$ = this.contactService.contacts$.pipe(
    map(contacts => this.createCategories(contacts)),
  );
  isEditing$ = this.contactService.isEditing$;
  selected$ = this.contactService.selected$;

  constructor(private contactService: ContactService) {}

  createCategories(contacts: Contact[]): Category<Contact>[] {
    return contacts.reduce((categories: Category<Contact>[], contact: Contact) => {

      const foundCategory = categories.find(category => category.letter === contact.lastName.charAt(0).toLocaleLowerCase());

      if (foundCategory) {
        foundCategory.list = [
          ...foundCategory.list,
          contact,
        ];
      } else {
        categories = [
          ...categories,
          {
            letter: contact.lastName.charAt(0).toLocaleLowerCase(),
            list: [contact],
          }
        ];
      }

      return categories;
    }, []);
  }

  select(contact: Contact): void {
    this.contactService.select(contact);
  }

  delete(contact: Contact): void {
    this.contactService.delete(contact);
  }
}
