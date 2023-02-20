import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.scss'],
})
export class TarjetasComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  cerrarModal(){
    this.modalCtrl.dismiss()
  }
}
