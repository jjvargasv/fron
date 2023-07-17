import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  // Procuramos usar los mismos nombres que espera nuestra API en las propiedades que agrupamos en nuestro FormBuilder Group
  registerForm: FormGroup = this.fb.group({
    name: [
      '',   // Valor por defecto
      [
        Validators.required
      ]
    ],
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

  register() {
    console.group( 'registerForm' );
    console.log( this.registerForm.value );
    console.log( this.registerForm.valid );
    console.groupEnd();

    // this.router.navigate([ 'dashboard' ]);
    this.router.navigateByUrl( '/dashboard' );
  }

}
