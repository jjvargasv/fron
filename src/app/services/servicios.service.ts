import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServiciosService {
  BASE_URL: string = environment.baseUrl;
  token!: string;
  headers!: HttpHeaders;

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token'); // Obtiene el Token del LocalStorage
    this.token = token ? token : ''; // Verifica si existe el token en el LocalStorage
    this.headers = new HttpHeaders().set('X-Token', `${this.token}`);
    // console.log( this.token );
  }

  /** Realiza petición al endpoint del BackEnd que registra productos */
  createServcio(servicio: any) {
    return this.http.post(
      `${this.BASE_URL}/servicios`, // URL del BackEnd al que debemos hacer la peticion
      servicio, // Objeto de producto a crear
      { headers: this.headers } // Cabeceras con información requerida
    );
  }

  create2Servicio(servicioForm: any): Observable<any> {
    const formData = new FormData();
    // formData.append('file', this.uploadForm.get('profile').value);

    formData.append('nombre', servicioForm.get('nombre').value);
    formData.append('precioServicio', servicioForm.get('precioServicio').value);
    formData.append('descripcion', servicioForm.get('descripcion').value);
    formData.append('notas', servicioForm.get('notas').value);
    formData.append('categoryServicios', servicioForm.get('categoryServicios').value);
    formData.append('urlImage', servicioForm.get('urlImage').value);

    return this.http.post<any>(
      `${this.BASE_URL}/servicios`, // URL del BackEnd al que debemos hacer la peticion
      formData, // Objeto de producto a crear
      {
        // Cabeceras con información requerida
        headers: this.headers,
        reportProgress: false,
        observe: 'events',
      }
    );
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code ${error.status}\nMessage: ${error.message}`;
    }

    console.log(errorMessage);

    return throwError(() => {
      return errorMessage;
    });
  }


  getAllServicios() {
    const data = this.http.get<any>(`${this.BASE_URL}/servicios`).pipe(
      map((res) => res['servicios'])
    )
    
    return data;
  }
}
