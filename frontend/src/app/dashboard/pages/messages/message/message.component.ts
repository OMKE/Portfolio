import { ComponentWithModal } from '../../../common/modal/custom-modal.abstract';
import { selectSelectedMessages, selectSelectedMessageLoaded } from './../../../store/messages/messages.selectors';

import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/dashboard/models/Message';
import { AppState } from 'src/app/core/store';



@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent extends ComponentWithModal implements OnInit {


  constructor(private store: Store<AppState>) { super(); }

  message$: Observable<Message>;

  loaded$: Observable<boolean>;

  open: Observable<boolean>;
  payload: any;

  onConfirmHandler(event: any): void {
    console.log(event);
  }
  question(): string {
    return 'Are you sure you want to delete this message?';
  }

  ngOnInit(): void {
    this.message$ = this.store.pipe(select(selectSelectedMessages));
    this.loaded$ = this.store.pipe(select(selectSelectedMessageLoaded));
  }

}
