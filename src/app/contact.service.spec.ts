import { TestBed } from '@angular/core/testing';

import { ContactService } from './contact.service';
import { Contact } from './models';

describe('ContactService', () => {
  let service: ContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sort contacts by last name', () => {
    const contacts = [
      { lastName: 'Alex' },
      { lastName: 'Abed' },
    ] as Contact[];

    expect(service.sort(contacts)[0].lastName).toBe('Abed');
  });

  it('should initialize isEditing$ as false', done => {
    service.isEditing$.subscribe(value => {
      expect(value).toBe(false);
      done();
    });
  });

  it('should initialize isAdding$ as false', done => {
    service.isAdding$.subscribe(value => {
      expect(value).toBe(false);
      done();
    });
  });

  it('should set isEditing and isAdding to false when contact is selected', () => {
    const selected = service.contacts[0];

    service.select(selected);

    expect(service.selected$.value).toBe(selected);
    expect(service.isAdding$.value).toBe(false);
    expect(service.isEditing$.value).toBe(false);
  });

  it('should add new item to contacts', () => {
    const mockContact = { id: '9999', firstName: 'Joe', lastName: 'Doe' } as Contact;

    expect(service.contacts.some(contact => contact.id === mockContact.id)).toBe(false);
    service.add(mockContact);
    expect(service.contacts.some(contact => contact.id === mockContact.id)).toBe(true);
  });

  it('should edit contact from contacts', () => {
    const contactToBeEdited = service.contacts[10];

    service.edit({ ...contactToBeEdited, firstName: 'Joe' });

    const foundContact = service.contacts.find(contact => contact.id === contactToBeEdited.id);

    expect(foundContact?.firstName).toBe('Joe');
  });

  it('should delete contact', () => {
    const contactToBeDeleted = service.contacts[0];

    service.delete(contactToBeDeleted);

    expect(service.contacts.some(contact => contact.id === contactToBeDeleted.id)).toBe(false);
  });

  it('should initialize selected$ with first element of contacts', done => {
    service.selected$.subscribe(initialState => {
      expect(initialState).toBe(service.contacts[0]);
      done();
    });
  });

  it('should uppercase new contact name', () => {
    const contact = { firstName: 'joe', lastName: 'doe' } as Contact;
    const expected = { firstName: 'Joe', lastName: 'Doe' } as Contact;

    expect(service.formatName(contact)).toEqual(expected);
  });
});
