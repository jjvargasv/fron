import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    const data = this.http.get(`${this.BASE_URL}/servicios`);
    data.subscribe((res) => {
      console.log(res);
    });
    return data;
  }
}
