import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Resenas } from 'src/app/protected/interfaces/resenas.interface';
import { ResenasService } from 'src/app/services/resenas.service';

@Component({
  selector: 'app-list-resenas',
  templateUrl: './list-resenas.component.html',
  styleUrls: ['./list-resenas.component.css']
})
export class ListResenasComponent {
  resenas! : Array<Resenas>;    // resenas! : Resenas[];
  selectedResena : Resenas | null = null;
  selectedResenaId!: string;

  resenaForm: FormGroup = this.fb.group({
    name: [
      '',   // Valor por defecto
      [
        Validators.required,
        Validators.minLength( 5 )
      ]
    ],
    description: [
      '',  // Valor por defecto
      []
    ]
  });

  constructor(
    private fb: FormBuilder,
    private resenasService: ResenasService 
  ) {}

  createOrUpdateResena() {
    if ( this.selectedResena ) {
      this.updateResena();
    } else {
      this.createResena();
    }
  }

  ngOnInit(): void {
    this.loadResenas();
  }

  loadResenas() {
    console.log( 'loadResenas' )
    this.resenasService.getResenas()
      .subscribe( Resenas => {
        this.resenas = Resenas;
      });
  }

  loadResena( resenas: Resenas ) {
    this.selectedResena = resenas;

    this.resenaForm.patchValue({
      name: resenas.name,
      description: resenas.description,
    });
  }

  createResena() {
    console.group( 'resenaForm' );
    console.log( this.resenaForm.value );
    console.log( this.resenaForm.valid );
    console.groupEnd();

    this.resenasService.createResena( this.resenaForm.value )
      .subscribe( response => {
        console.log( response );

        this.resenaForm.reset();
        this.loadResenas();
      });

  }

  deleteResena( ResenaId: string | undefined ) {
    this.resenasService.deleteResena( ResenaId )
      .subscribe( response => {
        console.log( response );

        this.loadResenas();
      });
  }

  updateResena() {

    if ( ! this.selectedResena )  {
      console.error('Selected Resena is undefined.');

      return;
    }

    // Actualiza la categoría con los nuevos datos del formulario.
    this.selectedResena.name = this.resenaForm.get( 'name' )?.value;
    this.selectedResena.description = this.resenaForm.get( 'description' )?.value;


    const resena = { ...this.selectedResena };

    console.log( resena );
    this.resenasService.updateResena( resena )
      .subscribe( response => {
        console.log( response );
      });


    // Restablece la resena y el formulario seleccionados después de que la actualización sea exitosa.
    this.selectedResena = null;
    this.resenaForm.reset();
    this.loadResenas();
  }
}
