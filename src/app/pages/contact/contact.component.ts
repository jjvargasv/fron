import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contacto } from 'src/app/protected/interfaces/contacto.interface';
import { ContactoService } from 'src/app/services/contactos.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contacto! : Array<Contacto>;    // categories! : Category[];
  selectedContacto: Contacto | null = null;
  selectedContactoId!: string;

  // Procuramos usar los mismos nombres que espera nuestra API en las propiedades que agrupamos en nuestro FormBuilder Group
  contactForm: FormGroup = this.fb.group({
    nombre: [
      '',   // Valor por defecto
      [
        Validators.required,
        Validators.minLength( 3 )
      ]
    ],
    celular: [
      '',  // Valor por defecto
      [
        Validators.required,
        Validators.minLength( 10 )
      ]
    ],
    correo :[
      '',
      [
        Validators.required,
      ]
    ],
    mensaje :[
      '',
      [
        Validators.required
      ]
    ]
  });

  constructor(
    private fb: FormBuilder,
    private contactoService: ContactoService
  ) {}


  ngOnInit(): void {
    this.loadContacto();
  }

  loadContacto() {
    console.log( 'loadContacto' )
    this.contactoService.getContactos()
      .subscribe( contacto => {
        this.contacto = contacto;
      });
  }

  loadContactos( contacto: Contacto ) {
    this.selectedContacto = contacto;

    this.contactForm.patchValue({
      nombre: contacto.nombre,
      celular: contacto.celular,
      correo: contacto.correo,
      mensaje: contacto.mensaje,
    });
  }

  createOrUpdateContacto() {
    if ( this.selectedContacto) {
      this.updateContacto();
    } else {
      this.createContacto();
    }
  }

  createContacto() {
    console.group( 'contactoForm' );
    console.log( this.contactForm.value );
    console.log( this.contactForm.valid );
    console.groupEnd();

    this.contactoService.createContacto( this.contactForm.value )
      .subscribe( response => {
        console.log( response );

        this.contactForm.reset();
        this.loadContacto();
      });

  }

  deleteContacto( contactoId: string | undefined ) {
    this.contactoService.deleteContacto( contactoId )
      .subscribe( response => {
        console.log( response );

        this.loadContacto();
      });
  }

  updateContacto() {

    if ( ! this.selectedContacto )  {
      console.error('Selected Contacto is undefined.');

      return;
    }

    // Actualiza la categoría con los nuevos datos del formulario.
    this.selectedContacto.nombre = this.contactForm.get( 'nombre' )?.value;
    this.selectedContacto.celular = this.contactForm.get( 'celular' )?.value;
    this.selectedContacto.correo = this.contactForm.get( 'correo' )?.value;
    this.selectedContacto.mensaje = this.contactForm.get( 'mensaje' )?.value;


    const contacto = { ...this.selectedContacto };

    console.log( contacto );
    this.contactoService.updateContacto( contacto )
      .subscribe( response => {
        console.log( response );
      });


    // Restablece la categoría y el formulario seleccionados después de que la actualización sea exitosa.
    this.selectedContacto = null;
    this.contactForm.reset();
    this.loadContacto();
  }



}
