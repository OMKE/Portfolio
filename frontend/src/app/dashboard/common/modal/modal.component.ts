import { Modal } from './modal.abstract';
import { Observable, of } from 'rxjs';
import { Component, Input, OnInit, Output, EventEmitter, HostListener } from '@angular/core';

// Helper type to get rid of getAttribute not defined error
interface Event {
  target: {
    getAttribute(attrName: string): string;
  };
}

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

  @HostListener('click', ['$event']) onFocusOut(event: Event): void {
    const target = event.target.getAttribute('class');
    if (target) {
      if (target.includes('modal--active')) {
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
