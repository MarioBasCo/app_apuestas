import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ICompeticion, IEquipo } from 'src/app/interfaces/interfaces';
import { EquiposService } from 'src/app/servicios/equipos.service';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PartidosService } from 'src/app/servicios/partidos.service';

@Component({
  selector: 'app-modal-partido',
  templateUrl: './modal-partido.component.html',
  styleUrls: ['./modal-partido.component.scss'],
})
export class ModalPartidoComponent implements OnInit {
  equipos: IEquipo[]=[];
  competiciones: ICompeticion [] = [];
  formPartido: FormGroup;
  date: any;

  constructor(
    private serEquipo: EquiposService,
    private serPartido: PartidosService,
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private serMensaje: MensajesService) { 
    this.formPartido = this.initForm();
  }

  ngOnInit() {
    this.cargarEquipos();
    this.cargarCompeticiones();
  }

  initForm(): FormGroup{
    return this.fb.group({
      id_local: ['', [Validators.required]],
      id_visitante: ['', [Validators.required]],
      fecha: ['', Validators.required],
      hora: ['', [Validators.required]],
      id_competicion: ['', [Validators.required]],
      id_estado: [1],
      estado: [1]
    });
  }

  cargarEquipos(){
   this.serEquipo.getEquipos().subscribe(resp=> {
    this.equipos = resp.info;
   }); 
  }

  cargarCompeticiones(){
    this.serEquipo.getCompeticiones().subscribe(resp=> {
      this.competiciones = resp.info;
    });
  }

  guardar(){
    const data = this.formPartido.value;
    //console.log(this.formPartido.value);
    this.serPartido.nuevoPartido(data).subscribe(resp=> {
      if(resp.estado){
        this.serMensaje.showToast(resp.mensaje);
        this.modalCtrl.dismiss(null, 'update');
      } else {
        this.serMensaje.showToast(resp.mensaje, 'danger');
      }
    });
  }

  cerrar(){
    this.modalCtrl.dismiss();
  }
}
