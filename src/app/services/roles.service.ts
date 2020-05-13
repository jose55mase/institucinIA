import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Headers,RequestOptions } from "@angular/http";
import { environment } from 'environments/environment';
import { ModuleRoles } from 'app/models/roles.model';




@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private headers = new Headers({'Content_Type':'application/json'});
  private options = new RequestOptions({headers:this.headers})

  URI: string;
  constructor(private http: HttpClient) { 
    this.URI = `${environment.apiUrl}`
  }

  getAllService(): Observable<ModuleRoles[]> {   
    return this.http.get<ModuleRoles[]>(`${this.URI}/roles/list`)
  }

  save(data): Observable<ModuleRoles> {   
    return this.http.post<ModuleRoles>(`${this.URI}/roles/save`,data)
  }

  update(data): Observable<ModuleRoles> {
    return this.http.post<ModuleRoles>(`${this.URI}/roles/save`,data)
  }

  delete(data): Observable<ModuleRoles> {   
    return this.http.post<ModuleRoles>(`${this.URI}/roles/delete`,data)
  }
}