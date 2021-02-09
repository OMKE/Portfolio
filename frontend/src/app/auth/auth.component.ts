import { debounceTime, distinctUntilChanged, throttleTime, tap } from 'rxjs/operators';
import { selectRequestingAuth, selectRequestingAuthFailure, selectIsLoggedIn } from './auth.selectors';
import { Observable, pipe } from 'rxjs';
import { AppState } from 'src/app/core/store';
import { requestAuth, requestAuthFormValueChanged } from './auth.actions';
import { LoginRequest } from './models/auth.request';
import { Store, select } from '@ngrx/store';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  loginForm: FormGroup;

  requestingAuth$: Observable<boolean>;
  requestingAuthFailure$: Observable<boolean>;



  constructor(private fb: FormBuilder, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    /*
      When user clicks on login button, it changes state of it so it shows loading indicator and error if authentication is unsuccessfull,
      We have to change to initial state when user changes input value, action is dispatched only if input value is changed and every 3 seconds
    */
    this.loginForm.valueChanges
    .pipe(
      throttleTime(3000),
      distinctUntilChanged(),
      tap(_ => this.store.dispatch(requestAuthFormValueChanged())),
    ).subscribe();

    this.requestingAuth$ = this.store.pipe(select(selectRequestingAuth));
    this.requestingAuthFailure$ = this.store.pipe(select(selectRequestingAuthFailure));
  }

  loginhandler(): void {
    if (this.loginForm.valid) {
      const data: LoginRequest = {...this.loginForm.value };
      this.store.dispatch(requestAuth({data}));
    } else {
      console.error('Login form is invalid');
    }
  }


  get email(): AbstractControl { return this.loginForm.get('email'); }
  get password(): AbstractControl { return this.loginForm.get('password'); }
}
