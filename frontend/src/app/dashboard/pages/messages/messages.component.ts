import { setTitle } from './../../../core/utilities/misc.utils';
import { Title } from '@angular/platform-browser';
import { selectAllMessages } from './../../store/messages/messages.selectors';
import { Observable, pipe } from 'rxjs';
import { loadMessagess, showMessage } from './../../store/messages/messages.actions';
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

  constructor(private store: Store<AppState>, private title: Title) {}

  ngOnInit(): void {
    setTitle(this.title, 'Messages');
    this.messages$ = this.store.select(selectAllMessages);
    this.store.dispatch(loadMessagess());
  }
}
