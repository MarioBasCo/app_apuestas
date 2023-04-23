import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ICompeticion } from 'src/app/interfaces/interfaces';
import { EquiposService } from 'src/app/servicios/equipos.service';
import { MensajesService } from 'src/app/servicios/mensajes.service';

@Component({
  selector: 'app-competicion',
  templateUrl: './competicion.component.html',
  styleUrls: ['./competicion.component.scss'],
})
export class CompeticionComponent implements OnInit {
  competiciones: ICompeticion[]=[];

  constructor(
    private serMensaje: MensajesService,
    private serCompe: EquiposService,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.cargarCompeticiones();
  }

  cargarCompeticiones(){
    this.serCompe.getCompeticiones().subscribe(resp=> {
      this.competiciones = resp.info;
    });
  }

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
            if (nombre.length > 0) {
              const data = {competicion: nombre, estado: 1};
              this.serCompe.crearCompeticion(data).subscribe(resp => {
                if (resp.estado) {
                  this.serMensaje.showToast(resp.mensaje);
                  this.cargarCompeticiones();
                } else {
                  this.serMensaje.showToast(resp.mensaje, 'danger');
                }
              })
            } else {
              //this.serMensaje.showToast('Debe ingresar un nombre', 'danger');
            }
          },
        },
      ],
    });

    await alert.present();
  }
}
