import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { ModelCountries } from 'app/models/countries.model';
import { ModuleActivity } from 'app/models/activity.model';


@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  
  URI: string;
  constructor(private http: HttpClient) { 
    this.URI = `${environment.apiUrl}`
  }
  ModuleActivity;
  getAllService(): Observable<ModuleActivity[]> {   
    return this.http.get<ModuleActivity[]>(`${this.URI}/Actividades`)
  }

  save(data): Observable<ModuleActivity> {   
    return this.http.post<ModuleActivity>(`${this.URI}/Actividades`,data)
  }

  update(data): Observable<ModuleActivity> {   
    console.log("DATA",data)
    return this.http.put<ModuleActivity>(`${this.URI}/Actividades/${data.id}`,data)
  }

  delete(data): Observable<{}>  { 
      
    return this.http.delete<ModuleActivity>(`${this.URI}/Actividades/${data.id}`)
  }
  
}
