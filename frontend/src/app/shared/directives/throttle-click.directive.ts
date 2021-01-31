import { Directive, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

/*
  This directive stops user from multiple form submits, it fires one event and throttles others for default 2s
*/
@Directive({
  selector: '[appThrottleClick]'
})
export class ThrottleClickDirective implements OnInit, OnDestroy {

  @Input() throttleTime = 2000;

  @Output() throttleClick = new EventEmitter();

  private clicks = new Subject();
  private subscription: Subscription;

  constructor() { }


  ngOnInit(): void {
    this.subscription = this.clicks.pipe(
      throttleTime(this.throttleTime)
    ).subscribe(e => this.throttleClick.emit(e));
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  @HostListener('click', ['$event']) clickEvent(event): void {
    if (!this.checkIfNotFormField(event))
    {
      event.preventDefault();
      event.stopPropagation();
      this.clicks.next(event);
    }

  }

  checkIfNotFormField(event: any): boolean {
    const fields = ['INPUT', 'CHECKBOX', 'TEXTAREA', 'RADIO', 'SELECT', 'FIELDSET', 'OPTION', 'LEGEND'];
    return fields.includes(event.target.tagName);
  }

}
