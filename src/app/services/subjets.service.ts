import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { ModelCountries } from 'app/models/countries.model';


@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  
  URI: string;
  constructor(private http: HttpClient) { 
    this.URI = `${environment.apiUrl}`
  }

  getAllService(): Observable<ModelCountries[]> {   
    return this.http.get<ModelCountries[]>(`${this.URI}/countries/list`)
  }

  save(data): Observable<ModelCountries> {   
    return this.http.post<ModelCountries>(`${this.URI}/countries/save`,data)
  }

  update(data): Observable<ModelCountries> {   
    return this.http.post<ModelCountries>(`${this.URI}/countries/save`,data)
  }

  delete(data): Observable<ModelCountries> {   
    return this.http.post<ModelCountries>(`${this.URI}/countries/delete`,data)
  }
  
}
