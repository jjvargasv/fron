import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs';
import { Resenas } from '../protected/interfaces/resenas.interface';
import { resenasResponse } from '../protected/interfaces/resenas-response.interface';


@Injectable({
  providedIn: 'root'
})
export class ResenasService {
    /** Atributos */
    BASE_URL: string = environment.baseUrl;
    token!: string;
    headers!: HttpHeaders;

  constructor(
    private http: HttpClient
  ) {
    const token = localStorage.getItem( 'token' );    // Obtiene el Token del LocalStorage
    this.token = token ? token : '';                  // Verifica si existe el token en el LocalStorage
    this.headers = new HttpHeaders().set( 'X-Token', `${ this.token }` );
    // console.log( this.token );
  }

  getResenas() {

    return this.http.get<resenasResponse>(
      `${ this.BASE_URL }/resena`   // URL del BackEnd al que debemos hacer la peticion
                           // Cabeceras con información requerida
    )
    .pipe(
      tap( response => {
        console.log( response );
      }),
      map( response => response[ 'resenas' ] )
    );
  }

  /** Realiza petición al endpoint del BackEnd que registra productos */
  createResena( resenas : Resenas ) {

    return this.http.post(
      `${ this.BASE_URL }/resena`,      // URL del BackEnd al que debemos hacer la peticion
      resenas,                            // Objeto de producto a crear
      { headers: this.headers }           // Cabeceras con información requerida
    );
  }

  deleteResena( resenasId: string | undefined ) {

    return this.http.delete<Resenas>(
      `${ this.BASE_URL }/resena/${ resenasId }`,   // URL del BackEnd al que debemos hacer la peticion
      { headers: this.headers }                         // Cabeceras con información requerida
    );
  }

 
  updateResena( resenas: any ) {

    return this.http.patch(
      `${ this.BASE_URL }/resena/${ resenas._id }`,   // URL del BackEnd al que debemos hacer la peticion
      resenas,
      { headers: this.headers }                         // Cabeceras con información requerida
    );
  }

}
