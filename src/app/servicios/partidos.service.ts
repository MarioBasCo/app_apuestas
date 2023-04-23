import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObjectToFormDataService } from './object-to-form-data.service';
import { webservice } from './webservice-url';

@Injectable({
  providedIn: 'root'
})
export class PartidosService {

  constructor(private utilSer: ObjectToFormDataService, private http: HttpClient) { }

  nuevoPartido(data: any){
    const URL = `${webservice}/nuevopartido`;
    return this.http.post<any>(URL, this.utilSer.objectToFormData(data));
  }

  getPartidos(){
    const URL = `${webservice}/partidos`;
    return this.http.get<any>(URL);
  }
}
