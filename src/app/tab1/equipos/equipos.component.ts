import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { IEquipo } from 'src/app/interfaces/interfaces';
import { EquiposService } from 'src/app/servicios/equipos.service';
import { MensajesService } from 'src/app/servicios/mensajes.service';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.scss'],
})
export class EquiposComponent implements OnInit {
  equipos: IEquipo[]=[];

  constructor(private alertCtrl: AlertController, 
    private serMensaje: MensajesService,
    private serEquipo: EquiposService) { }

  ngOnInit() {
    this.cargarEquipos();
  }

  cargarEquipos(){
    this.serEquipo.getEquipos().subscribe(resp=> {
      this.equipos = resp.info;
    });
  }

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
            
            if (nombre.length > 0) {
              const data = {nombre_equipo: nombre, estado: 1};
              this.serEquipo.crearEquipo(data).subscribe(resp => {
                if (resp.estado) {
                  this.serMensaje.showToast(resp.mensaje);
                  this.cargarEquipos();
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
