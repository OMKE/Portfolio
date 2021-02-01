import { selectAllMessages } from './../../store/messages/messages.selectors';
import { Observable } from 'rxjs';
import { loadMessagess } from './../../store/messages/messages.actions';
import { Store } from '@ngrx/store';
import { Component, HostListener, OnInit } from '@angular/core';
import { AppState } from 'src/app/core/store';
import { Message } from '../../models/Message';

@Component({
  selector: 'app-dashboard-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  messages$: Observable<Message[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.messages$ = this.store.select(selectAllMessages);
    this.store.dispatch(loadMessagess());
  }
}
