import { AppState } from 'src/app/core/store';
import { requestAuth } from './auth.actions';
import { LoginRequest } from './models/auth.request';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
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
