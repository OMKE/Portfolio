import { EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Modal {
    open: Observable<boolean>;
    payload: any;
    onConfirm: EventEmitter<any>;
    onConfirmEmitter(): void;
}

export interface HasModal {
    open: Observable<boolean>;
    payload: any;
    onConfirmHandler(event): void;
    question(): string;
    confirmAction(payload: any): void;
}

export abstract class ComponentWithModal implements HasModal {
    open: Observable<boolean>;
    payload: any;
    abstract onConfirmHandler(event: any): void;

    abstract question(): string;

    confirmAction(payload: any): void {
        this.open = of(true);
        this.payload = payload;
    }
}
