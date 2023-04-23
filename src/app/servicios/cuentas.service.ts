import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObjectToFormDataService } from './object-to-form-data.service';
import { webservice } from './webservice-url';

@Injectable({
  providedIn: 'root'
})
export class CuentasService {

  constructor(private http: HttpClient, private serUtil: ObjectToFormDataService) { }

  getBancos() {
    const URL = `${webservice}/bancos`;
    return this.http.get<any>(URL);
  }

  getTipoCta() {
    const URL = `${webservice}/tipocuentas`;
    return this.http.get<any>(URL);
  }

  nuevaCta(data: any) {
    const URL = `${webservice}/nuevacta`;
    return this.http.post<any>(URL, this.serUtil.objectToFormData(data));
  }

  getCuentasUsr(id: number) {
    const URL = `${webservice}/cuentasusuario/${id}`;
    return this.http.get<any>(URL);
  }
}
