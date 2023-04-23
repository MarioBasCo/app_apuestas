import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../servicios/storage.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  segment: string = 'home';
  id_perfil: number = 0;

  constructor(
    private router: Router,
    private serStorage: StorageService) {
    const usr = this.serStorage.get('user');
    this.id_perfil = usr.id_perfil;
  }

  cerrarSesion(){
    this.serStorage.clear();
    this.router.navigateByUrl('/auth', { replaceUrl: true });
  }
}
