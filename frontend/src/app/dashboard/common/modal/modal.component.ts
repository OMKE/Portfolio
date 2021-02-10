import { Modal } from './custom-modal.abstract';
import { Observable, of } from 'rxjs';
import { Component, Input, OnInit, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, Modal {

  constructor() { }

  @Input() open: Observable<boolean>;

  @Input() payload: any;


  @Input() question = '';

  @Output() onConfirm: EventEmitter<any> = new EventEmitter();

  @HostListener('click', ['$event']) onFocusOut(event: Event):void {
    const target = event.target.getAttribute('class');
    if(target) {
      if(target.includes('modal--active')) {
      this.cancel();
      }
    }
  }

  ngOnInit(): void {
  }

  cancel(): void {
    this.open = of(false);
  }

  onConfirmEmitter() {
    this.onConfirm.emit(this.payload);
    this.open = of(false);
  }

}
