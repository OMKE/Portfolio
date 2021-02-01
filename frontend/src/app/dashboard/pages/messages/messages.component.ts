import { Component, OnInit } from '@angular/core';
import { selectAllMessages } from './../../store/messages/messages.selectors';
import { loadMessagess } from './../../store/messages/messages.actions';

@Component({
  selector: 'app-dashboard-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  constructor() { }
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.messages$ = this.store.select(selectAllMessages);
    this.store.dispatch(loadMessagess());
  }

}
