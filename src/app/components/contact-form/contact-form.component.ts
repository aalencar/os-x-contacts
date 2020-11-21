import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/contact.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {

  selected$ = this.contactService.selected$.pipe(
    tap(contact => this.form.patchValue({ ...contact })),
    tap(() => this.form.disable())
  );
  isAdding$ = this.contactService.isAdding$;
  isEditing$ = this.contactService.isEditing$;

  form = new FormGroup({
    id: new FormControl(''),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    phone: new FormControl(''),
    email: new FormControl(''),
    address: new FormControl(''),
    note: new FormControl(''),
  });

  constructor(private contactService: ContactService) {}

  startAdding(): void {
    this.clearForm();
    this.form.enable();
    this.contactService.isAdding$.next(true);
  }

  clearForm(): void {
    this.form.patchValue({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      address: '',
      note: '',
    });
  }

  startEditing(): void {
    this.form.enable();
    this.isEditing$.next(true);
  }

  submitAdd(): void {
    this.contactService.add(this.form.value);
  }

  submitEdit(): void {
    this.contactService.edit(this.form.value);
  }
}
