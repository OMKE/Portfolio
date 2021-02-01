import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages-list-item',
  templateUrl: './messages-list-item.component.html',
  styleUrls: ['./messages-list-item.component.scss']
})
export class MessagesListItemComponent implements OnInit {

  @Input() name = '';

  @Input() message = '';

  @Input() createdAt: Date = null;

  @Input() isLast = false;

  constructor() { }

  ngOnInit(): void {
  }

}
