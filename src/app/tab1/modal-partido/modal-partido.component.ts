import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-partido',
  templateUrl: './modal-partido.component.html',
  styleUrls: ['./modal-partido.component.scss'],
})
export class ModalPartidoComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  cerrar(){
    this.modalCtrl.dismiss();
  }
}
