import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs';
import { Contacto } from '../protected/interfaces/contacto.interface';
import { contactoResponse } from '../protected/interfaces/contacto-response.interface';


@Injectable({
  providedIn: 'root'
})
export class ContactoService {
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

  getContacto() {

    return this.http.get<contactoResponse>(
      `${ this.BASE_URL }/contacto`   // URL del BackEnd al que debemos hacer la peticion
                           // Cabeceras con información requerida
    )
    .pipe(
      tap( response => {
        console.log( response );
      }),
      map( response => response[ 'contacto' ] )
    );
  }

  /** Realiza petición al endpoint del BackEnd que registra productos */
  createContacto( contactos : Contacto ) {

    return this.http.post(
      `${ this.BASE_URL }/contacto`,      // URL del BackEnd al que debemos hacer la peticion
      contactos,                            // Objeto de producto a crear
      { headers: this.headers }           // Cabeceras con información requerida
    );
  }

  deleteContacto( contactoId: string | undefined ) {

    return this.http.delete<Contacto>(
      `${ this.BASE_URL }/contacto/${ contactoId }`,   // URL del BackEnd al que debemos hacer la peticion
      { headers: this.headers }                         // Cabeceras con información requerida
    );
  }

 
  updateContacto( contacto: any ) {

    return this.http.patch(
      `${ this.BASE_URL }/contacto/${ contacto._id }`,   // URL del BackEnd al que debemos hacer la peticion
      contacto,
      { headers: this.headers }                         // Cabeceras con información requerida
    );
  }

}
