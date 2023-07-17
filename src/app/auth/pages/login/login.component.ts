import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    private router: Router
  ) {}

  login() {
    console.group( 'loginForm' );
    console.log( this.loginForm.value );
    console.log( this.loginForm.valid );
    console.groupEnd();

    // this.router.navigate([ 'dashboard' ]);
    this.router.navigateByUrl( '/dashboard' );
  }

}
