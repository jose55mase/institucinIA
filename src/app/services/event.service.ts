import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EventService {
  URI: string;
  constructor(private http: HttpClient) { 
    this.URI = `${environment.apiUrl}`
  }

  getAllService(): Observable<any> {   
    return this.http.get<any>(`${this.URI}/Eventos`)
  }

  save(data): Observable<any> {   
    return this.http.post<any>(`${this.URI}/Eventos`,data)
  }

  update(data): Observable<any> {   
    return this.http.put<any>(`${this.URI}/Eventos/${data.id}`,data)
  }

  delete(data): Observable<any> {   
    return this.http.delete<any>(`${this.URI}/Eventos/${data.id}`)
  }
  
}
