import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObjectToFormDataService } from './object-to-form-data.service';
import { webservice } from './webservice-url';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private serUtil: ObjectToFormDataService) { }

  login(data: any){
    const URL = `${webservice}/login`;
    return this.http.post<any>(URL, this.serUtil.objectToFormData(data));
  }

  registro(data: any){
    const URL = `${webservice}/registro`;
    return this.http.post<any>(URL, this.serUtil.objectToFormData(data));
  }

  actualizarDatos(data: any, id:number){
    const URL = `${webservice}/actualizaciondatos/${id}`;
    return this.http.post<any>(URL, this.serUtil.objectToFormData(data));
  }
}
