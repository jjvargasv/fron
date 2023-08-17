import { Component, OnInit } from '@angular/core';
import { Contacto } from '../../interfaces/contacto.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactoService } from 'src/app/services/contactos.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  contacto! : Array<Contacto>;    // categories! : Category[];
  selectedContacto: Contacto | null = null;
  selectedContactoId!: string;

  // Procuramos usar los mismos nombres que espera nuestra API en las propiedades que agrupamos en nuestro FormBuilder Group
  contactoForm: FormGroup = this.fb.group({
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
        Validators.email
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

    this.contactoForm.patchValue({
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
    console.log( this.contactoForm.value );
    console.log( this.contactoForm.valid );
    console.groupEnd();

    this.contactoService.createContacto( this.contactoForm.value )
      .subscribe( response => {
        console.log( response );

        this.contactoForm.reset();
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
    this.selectedContacto.nombre = this.contactoForm.get( 'nombre' )?.value;
    this.selectedContacto.celular = this.contactoForm.get( 'celular' )?.value;
    this.selectedContacto.correo = this.contactoForm.get( 'correo' )?.value;
    this.selectedContacto.mensaje = this.contactoForm.get( 'mensaje' )?.value;


    const contacto = { ...this.selectedContacto };

    console.log( contacto );
    this.contactoService.updateContacto( contacto )
      .subscribe( response => {
        console.log( response );
      });


    // Restablece la categoría y el formulario seleccionados después de que la actualización sea exitosa.
    this.selectedContacto = null;
    this.contactoForm.reset();
    this.loadContacto();
  }



}
