import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  login( email: string, password: string ) {
    const
      URL = `${ this.baseUrl }/auth/login`,
      body = {
        email, password
      };

    return this.http.post( URL, body );   // Retorna un Observable
  }

}
