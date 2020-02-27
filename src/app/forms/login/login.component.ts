import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { ToastService } from '../../shared/services/toast/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {
  private _subscription: Subscription;
  private _firstLoading = true;

  loginForm: FormGroup;
  loading = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastService: ToastService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.validate()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this._subscription = this.authenticationService.isLogIn$.subscribe(isLogin => {
      if (isLogin) {
        this.router.navigate([this.returnUrl]);
        this.toastService.success('Pomyślnie zalogowano');
      } else {
        if (this._firstLoading) {
          this._firstLoading = false;
        } else {
          this.toastService.warn('Niepoprawne dane logowania');
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.toastService.warn('Login ani hasło nie mogą być puste');
      return;
    }

    this.authenticationService.login(this.controlForm.username.value, this.controlForm.password.value);
  }


  private get controlForm() { return this.loginForm.controls; }

}
