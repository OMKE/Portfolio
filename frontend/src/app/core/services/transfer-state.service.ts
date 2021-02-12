import { environment } from './../../../environments/environment';
import { isPlatformServer } from '@angular/common';
import {
  StateKey,
  TransferState,
  makeStateKey,
} from '@angular/platform-browser';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TransferStateService {
  constructor(
    @Inject(PLATFORM_ID) private readonly platformId,
    private readonly transferState: TransferState
  ) {}

  private keys = new Map<string, StateKey<string>>();

  get<T>(key: string, defaultValue?: T | null): T | null {
    if (!this.has(key)) {
      return defaultValue || null;
    }
    const value = this.transferState.get<T>(
      this.getStateKey(key),
      defaultValue
    );
    return value;
  }

  remove(key: string): void {
    if (!this.has(key)) {
      return;
    }
    this.transferState.remove(this.getStateKey(key));
  }

  has(key: string): boolean {
    return this.transferState.hasKey(this.getStateKey(key));
  }

  set<T>(key: string, value: T): void {
    if (isPlatformServer(this.platformId)) {
      if (this.has(key)) {
        console.warn(
          `Setting existing value into TransferState using key: ${key}`
        );
      }
      if (!environment.production) {
        console.log(`Storing TransferState for: ${key}`);
      }
      this.transferState.set(this.getStateKey(key), value);
    }
  }

  private getStateKey(key: string): StateKey<string> {
    if (this.keys.has(key)) {
      return this.keys.get(key);
    }
    this.keys.set(key, makeStateKey(key));
    return this.keys.get(key);
  }
}
