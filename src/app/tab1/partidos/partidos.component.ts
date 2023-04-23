import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IPartido } from 'src/app/interfaces/interfaces';
import { PartidosService } from 'src/app/servicios/partidos.service';
import { ModalPartidoComponent } from '../modal-partido/modal-partido.component';

@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.component.html',
  styleUrls: ['./partidos.component.scss'],
})
export class PartidosComponent implements OnInit {
  partidos:IPartido[]=[];

  constructor(
    private serPartido: PartidosService,
    private modalCtrl: ModalController) { }

  ngOnInit() {
    this.cargarPartidos();
  }

  cargarPartidos(){
    this.serPartido.getPartidos().subscribe(resp=> {
      this.partidos = resp.info;
    });
  }

  async nuevo() {
    const modal = await this.modalCtrl.create({
      component: ModalPartidoComponent,
      cssClass: 'my-modal'
    });
    
    await modal.present();

    const { role } = await modal.onWillDismiss();

    if (role === 'update') {
      this.cargarPartidos();
    }
  }
}
