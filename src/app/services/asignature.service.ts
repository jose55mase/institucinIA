import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Headers,RequestOptions } from "@angular/http";
import { environment } from 'environments/environment';
import { ModuleAsignature } from 'app/models/asignature.model';




@Injectable({
  providedIn: 'root'
})
export class AsignatureService {

  private headers = new Headers({'Content_Type':'application/json'});
  private options = new RequestOptions({headers:this.headers})

  URI: string;
  constructor(private http: HttpClient) { 
    this.URI = `${environment.apiUrl}`
  }

  getAllService(): Observable<ModuleAsignature[]> {   
    //return this.http.get<ModuleAsignature[]>(`${this.URI}/roles/list`)
    return this.http.get<ModuleAsignature[]>(`${this.URI}/Materias`)
  }

  save(data): Observable<ModuleAsignature> {   
    return this.http.post<ModuleAsignature>(`${this.URI}/roles/save`,data)
  }

  update(data): Observable<ModuleAsignature> {
    return this.http.post<ModuleAsignature>(`${this.URI}/roles/save`,data)
  }

  delete(data): Observable<ModuleAsignature> {   
    return this.http.post<ModuleAsignature>(`${this.URI}/roles/delete`,data)
  }
}