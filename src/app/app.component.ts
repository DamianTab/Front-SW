import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from './shared/services/authentication/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  isAuthenticated = false;

  constructor(private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.subscription = this.auth.isLogIn$.subscribe((isLogIn) => {
      this.isAuthenticated = isLogIn;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
