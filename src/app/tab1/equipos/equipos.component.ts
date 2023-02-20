import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.scss'],
})
export class EquiposComponent implements OnInit {

  constructor(private alertCtrl: AlertController) { }

  ngOnInit() {}

  async nuevo() {
    const alert = await this.alertCtrl.create({
      header: 'Nuevo Equipo',
      inputs: [
        {
          name: 'input1',
          type: 'text',
          placeholder: 'Nombre del equipo',
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: () => { },
        },
        {
          text: 'Confirmar',
          handler: (alertData: any) => {
            let nombre = alertData.input1;
          },
        },
      ],
    });

    await alert.present();
  }

}
