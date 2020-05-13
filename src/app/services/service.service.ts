import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  URI: string;
  constructor(private http: HttpClient) { 
    this.URI = `${environment.apiUrl}`
  }

  getAllService(): Observable<any> {   
    return this.http.get<any>(`${this.URI}/service/list`)
  }

  save(data): Observable<any> {   
    return this.http.post<any>(`${this.URI}/service/save`,data)
  }

  update(data): Observable<any> {   
    return this.http.post<any>(`${this.URI}/service/save`,data)
  }

  delete(data): Observable<any> {   
    return this.http.post<any>(`${this.URI}/service/delete`,data)
  }
  
}
