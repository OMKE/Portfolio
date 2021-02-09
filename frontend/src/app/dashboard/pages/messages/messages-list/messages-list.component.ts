import { showMessage } from './../../../store/messages/messages.actions';
import { selectMessagesLoaded } from './../../../store/messages/messages.selectors';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Message } from './../../../models/Message';
import { Component, Input, OnInit } from '@angular/core';
import { AppState } from 'src/app/core/store';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss']
})
export class MessagesListComponent implements OnInit {

  @Input() messages: Message[];

  loaded$: Observable<boolean>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.loaded$ = this.store.pipe(select(selectMessagesLoaded));
  }

  showMessage(id: number): void {
    this.store.dispatch(showMessage({ id }));
  }

}
