import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  URI: string;
  constructor(private http: HttpClient) { 
    this.URI = `${environment.apiUrl}`
  }

  getAllService(): Observable<any> {   
    return this.http.get<any>(`${this.URI}/Usuarios`)
  }

  save(data): Observable<any> {   
    return this.http.post<any>(`${this.URI}/Usuarios`,data)
  }

  update(data): Observable<any> {   
    return this.http.put<any>(`${this.URI}/Usuarios/${data.id}`,data)
  }

  delete(data): Observable<any> {   
    return this.http.delete<any>(`${this.URI}/Usuarios/${data.id}`)
  }
  
}
