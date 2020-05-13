import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  URL: string;
  constructor(private http: HttpClient) { 
    this.URL = `${environment.apiUrl}`
  }

  getAllService(): Observable<any> {   
    return this.http.get<any>(`${this.URL}/service/list`)
  }

  save(data): Observable<any> {   
    return this.http.post<any>(`${this.URL}/service/save`,data)
  }

  update(data): Observable<any> {   
    return this.http.post<any>(`${this.URL}/service/save`,data)
  }

  delete(data): Observable<any> {   
    return this.http.post<any>(`${this.URL}/service/delete`,data)
  }
  
}
