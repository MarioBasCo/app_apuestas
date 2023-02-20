import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-competicion',
  templateUrl: './competicion.component.html',
  styleUrls: ['./competicion.component.scss'],
})
export class CompeticionComponent implements OnInit {

  constructor(private alertCtrl: AlertController) { }

  ngOnInit() {}

  async nuevo() {
    const alert = await this.alertCtrl.create({
      header: 'Nueva Competición',
      inputs: [
        {
          name: 'input1',
          type: 'text',
          placeholder: 'Nombre de la competición',
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
