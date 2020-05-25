import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { ModelSubjets } from 'app/models/subjets.model';


@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  
  URI: string;
  constructor(private http: HttpClient) { 
    this.URI = `${environment.apiUrl}`
  }

  getAllService(): Observable<ModelSubjets[]> {   
    return this.http.get<ModelSubjets[]>(`${this.URI}/countries/list`)
  }

  save(data): Observable<ModelSubjets> {   
    return this.http.post<ModelSubjets>(`${this.URI}/countries/save`,data)
  }

  update(data): Observable<ModelSubjets> {   
    return this.http.post<ModelSubjets>(`${this.URI}/countries/save`,data)
  }

  delete(data): Observable<ModelSubjets> {   
    return this.http.post<ModelSubjets>(`${this.URI}/countries/delete`,data)
  }
  
}
