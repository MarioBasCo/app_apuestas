import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IPartido } from 'src/app/interfaces/interfaces';
import { ApuestasService } from 'src/app/servicios/apuestas.service';
import { ModalApuestaComponent } from '../modal-apuesta/modal-apuesta.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  partidos: IPartido[]=[];

  constructor(
    private modalCtrl: ModalController,
    private serApuesta: ApuestasService) { }

  ngOnInit() {
    this.cargarApuestas();
  }

  cargarApuestas(){
    this.serApuesta.getApuestas().subscribe(resp=> {
      this.partidos = resp.info;
    });
  }

  async abrirModal(partido: IPartido){
    const modal = await this.modalCtrl.create({
      component: ModalApuestaComponent,
      cssClass: 'my-modal',
      componentProps: {
        partido
      }
    });
    
    await modal.present();

    //const { role } = await modal.onWillDismiss();
  }
}
