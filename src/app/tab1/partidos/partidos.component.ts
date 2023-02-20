import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPartidoComponent } from '../modal-partido/modal-partido.component';

@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.component.html',
  styleUrls: ['./partidos.component.scss'],
})
export class PartidosComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  async nuevo() {
    const modal = await this.modalCtrl.create({
      component: ModalPartidoComponent,
      cssClass: 'my-modal'
    });
    return await modal.present();
  }
}
