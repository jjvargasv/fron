import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  /** Getters */
  get user() {
    return this.authService.user;
  }

  logout() {
    // this.router.navigate([ 'auth', 'login' ]);
    this.router.navigateByUrl( '/auth/login' );
  }
}
