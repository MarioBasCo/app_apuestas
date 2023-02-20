import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApuestasComponent } from '../apuestas/apuestas.component';
import { TarjetasComponent } from '../tarjetas/tarjetas.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  async presentModalTarjetas() {
    const modal = await this.modalCtrl.create({
      component: TarjetasComponent,
      cssClass: 'small-modal'
    });
    return await modal.present();
  }

  async presentModalApuestas() {
    const modal = await this.modalCtrl.create({
      component: ApuestasComponent,
      cssClass: 'small-modal'
    });
    return await modal.present();
  }
}
