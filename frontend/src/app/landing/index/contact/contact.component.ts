import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(128)
        ]
      ],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(30), Validators.maxLength(950)]]
    });
  }

  get name(): AbstractControl { return this.contactForm.get('name'); }
  get email(): AbstractControl { return this.contactForm.get('email'); }
  get message(): AbstractControl { return this.contactForm.get('message'); }



  sendMessageHandler() {
    console.log(this.contactForm.value);
  }

}
