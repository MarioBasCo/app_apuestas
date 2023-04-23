import { Component } from '@angular/core';
import { IUsuario } from '../interfaces/interfaces';
import { ApuestasService } from '../servicios/apuestas.service';
import { StorageService } from '../servicios/storage.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  apuestas: any[] = [];

  constructor(
    private serStorage: StorageService,
    private serApuesta: ApuestasService) {
    const usr: IUsuario = this.serStorage.get('user');
    this.serApuesta.getMisApuestas(usr.id).subscribe(resp => {
      this.apuestas = resp.info;
    });
  }

}
