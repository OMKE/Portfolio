import { Message } from './../../../models/Message';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss']
})
export class MessagesListComponent implements OnInit {

  @Input() messages: Message[];

  constructor() { }

  ngOnInit(): void {
  }

}
