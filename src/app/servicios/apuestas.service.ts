import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObjectToFormDataService } from './object-to-form-data.service';
import { webservice } from './webservice-url';

@Injectable({
  providedIn: 'root'
})
export class ApuestasService {

  constructor(private http: HttpClient, private serUtil: ObjectToFormDataService) { }

  getPartidosSinApueta(){
    const URL = `${webservice}/apuestapartidos`;
    return this.http.get<any>(URL);
  }

  getApuestas(){
    const URL = `${webservice}/apuestas`;
    return this.http.get<any>(URL);
  }

  getApuestaById(id:number){
    const URL = `${webservice}/apuestaporid/${id}`;
    return this.http.get<any>(URL);
  }

  getTipoApuesta(){
    const URL = `${webservice}/tipoapuesta`;
    return this.http.get<any>(URL);
  }

  crearApuesta(data: any){
    const URL = `${webservice}/crearapuesta`;
    return this.http.post<any>(URL, this.serUtil.objectToFormData(data));
  }

  apostar(data: any){
    const URL = `${webservice}/apostar`;
    return this.http.post<any>(URL, this.serUtil.objectToFormData(data));
  }

  getMisApuestas(id:number){
    const URL = `${webservice}/misapuestas/${id}`;
    return this.http.get<any>(URL);
  }
}
