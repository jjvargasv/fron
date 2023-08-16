import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServiciosService {
  BASE_URL: string = environment.baseUrl;
  token!: string;
  headers!: HttpHeaders;
  constructor(private http: HttpClient) {}

  getAllServicios() {
    const data = this.http.get<any>(`${this.BASE_URL}/servicios`).pipe(
      map((res) => res['servicios'])
    )
    
    return data;
  }
}
