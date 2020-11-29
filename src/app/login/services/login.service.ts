import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {



  constructor(private http: HttpClient) { }

  login(): Observable<any> {
    console.log()
    return this.http.get<any>('http://127.0.0.1:3000/Usuarios')
    //return this.http.get<any>('http://192.168.127.1:3000/Usuarios')
  }

}
