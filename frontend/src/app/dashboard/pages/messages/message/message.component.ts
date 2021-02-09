import { selectSelectedMessages, selectSelectedMessageLoaded } from './../../../store/messages/messages.selectors';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/dashboard/models/Message';
import { AppState } from 'src/app/core/store';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  message$: Observable<Message>;

  loaded$: Observable<boolean>;

  ngOnInit(): void {
    this.message$ = this.store.pipe(select(selectSelectedMessages));
    this.loaded$ = this.store.pipe(select(selectSelectedMessageLoaded));
  }

  deleteHandler(message: Message): void {
    // callback()
    console.log(message);
  }

}
