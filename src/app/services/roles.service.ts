import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Headers,RequestOptions } from "@angular/http";




@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private headers = new Headers({'Content_Type':'application/json'});
  private options = new RequestOptions({headers:this.headers})

  constructor(private http: HttpClient) { }
  getAllService(): Observable<any> {   
    return this.http.get<any>('http://localhost:3000/Roles')
  }
}


