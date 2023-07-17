import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // Procuramos usar los mismos nombres que espera nuestra API en las propiedades que agrupamos en nuestro FormBuilder Group
  loginForm: FormGroup = this.fb.group({
    email: [
      '',   // Valor por defecto vacio
      [
        Validators.required,
        Validators.email
      ]
    ],
    password: [
      '', // Valor por defecto vacio
      [
        Validators.required,
        Validators.minLength( 6 )
      ]
    ]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  login() {
    console.group( 'loginForm' );
    console.log( this.loginForm.value );
    console.log( this.loginForm.valid );
    console.groupEnd();

    const { email, password } = this.loginForm.value;

    this.authService.login( email, password )
      .subscribe( response => {
        console.log( response );
      });

    // this.router.navigate([ 'dashboard' ]);
    // this.router.navigateByUrl( '/dashboard' );
  }

}
