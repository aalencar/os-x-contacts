import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Category, Contact } from 'src/app/models';

import { ContactListComponent } from './contact-list.component';

describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;

  const contactsMock: Contact[] = [
    {
      firstName: 'Joe',
      lastName: 'Doe',
      phone: '',
      email: '',
      address: '',
      note: '',
    },
    {
      firstName: 'Alexandre',
      lastName: 'Alencar',
      phone: '',
      email: '',
      address: '',
      note: '',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#createCategories', () => {

    it('should return empty list if empty list of contacts is provided', () => {
      expect(component.createCategories([])).toEqual([]);
    });

    it('should categorize contacts based on initial of last name', () => {

      const expectedCategory: Category<Contact>[] = [
        {
          letter: 'd',
          list: [contactsMock[0]]
        },
        {
          letter: 'a',
          list: [contactsMock[1]]
        },
      ];

      expect(component.createCategories(contactsMock)).toEqual(expectedCategory);
    });
  });

});
