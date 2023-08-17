import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contacto } from 'src/app/protected/interfaces/contacto.interface';
import { ContactoService } from 'src/app/services/contactos.service';

@Component({
  selector: 'app-list-contacto',
  templateUrl: './list-contacto.component.html',
  styleUrls: ['./list-contacto.component.css']
})
export class ListContactoComponent {
  contacto! : Array<Contacto>;    // resenas! : Resenas[];
  selectedContacto : Contacto | null = null;
  selectedcontactoId!: string;

  contactoForm: FormGroup = this.fb.group({
    nombre: [
      '',   // Valor por defecto
      [
        Validators.required,
        Validators.minLength( 5 )
      ]
    ],
    celular: [
      '',  // Valor por defecto
      [
        Validators.required,
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
        Validators.required,
      ]
    ]
  });

  constructor(
    private fb: FormBuilder,
    private contactoService: ContactoService
  ) {}

  createOrUpdateContacto() {
    if ( this.selectedContacto ) {
      this.updateContacto();
    } else {
      this.createContacto();
    }
  }

  ngOnInit(): void {
    this.loadContactos();
  }

  loadContactos() {
    console.log( 'loadContactos' )
    this.contactoService.getContactos()
      .subscribe( Contactos => {
        this.contacto = Contactos;
      });
  }

  loadContacto( contacto: Contacto ) {
    this.selectedContacto = contacto;

    this.contactoForm.patchValue({
      nombre: contacto.nombre,
      celular: contacto.celular,
      correo: contacto.correo,
      mensaje: contacto.mensaje,
    });
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
        this.loadContactos();
      });

  }

  deleteContacto( ResenaId: string | undefined ) {
    this.contactoService.deleteContacto( ResenaId )
      .subscribe( response => {
        console.log( response );

        this.loadContactos();
      });
  }

  updateContacto() {

    if ( ! this.selectedContacto )  {
      console.error('Selected Resena is undefined.');

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


    // Restablece la resena y el formulario seleccionados después de que la actualización sea exitosa.
    this.selectedContacto = null;
    this.contactoForm.reset();
    this.loadContactos();
  }
}
