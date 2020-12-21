import { fadeIn} from './../../../core/abstract/animations';
import { selectSendMessageSending, selectSendMessageSuccess, selectSendMessageProps, selectSendMessagePropsMessage } from './../../../core/store/message/message.selectors';
import { Observable } from 'rxjs';
import { Message } from './../../../core/store/message/message.model';
import { sendMessage } from './../../../core/store/message/message.actions';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppState } from 'src/app/core/store';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: [fadeIn],
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;


  sendMessageSending$: Observable<boolean>;
  sendMessageSuccess$: Observable<boolean>;

  sendMessagePropsMessage$: Observable<string>;

  constructor(private fb: FormBuilder, private store: Store<AppState>) { }

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

    this.sendMessageSending$ = this.store.pipe(select(selectSendMessageSending));
    this.sendMessageSuccess$ = this.store.pipe(select(selectSendMessageSuccess));
    this.sendMessagePropsMessage$ = this.store.pipe(select(selectSendMessagePropsMessage));
  }

  get name(): AbstractControl { return this.contactForm.get('name'); }
  get email(): AbstractControl { return this.contactForm.get('email'); }
  get message(): AbstractControl { return this.contactForm.get('message'); }



  sendMessageHandler() {

    const message: Message = {...this.contactForm.value};

    // Dispatch new action of sendMessage
    this.store.dispatch(sendMessage({ data: message }));
  }

}
