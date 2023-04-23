import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObjectToFormDataService } from './object-to-form-data.service';
import { webservice } from './webservice-url';

@Injectable({
  providedIn: 'root'
})
export class EquiposService {

  constructor(private http: HttpClient, private serUtil: ObjectToFormDataService) { }

  crearEquipo(data: any){
    const URL = `${webservice}/crearequipo`;
    return this.http.post<any>(URL, this.serUtil.objectToFormData(data));
  }

  getEquipos(){
    const URL = `${webservice}/equipos`;
    return this.http.get<any>(URL);
  }

  crearCompeticion(data: any) {
    const URL = `${webservice}/crearcompeticion`;
    return this.http.post<any>(URL, this.serUtil.objectToFormData(data));
  }

  getCompeticiones(){
    const URL = `${webservice}/competiciones`;
    return this.http.get<any>(URL);
  }
}
