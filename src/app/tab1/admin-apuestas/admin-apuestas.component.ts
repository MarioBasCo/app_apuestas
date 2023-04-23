import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPartido } from 'src/app/interfaces/interfaces';
import { ApuestasService } from 'src/app/servicios/apuestas.service';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PartidosService } from 'src/app/servicios/partidos.service';

@Component({
  selector: 'app-admin-apuestas',
  templateUrl: './admin-apuestas.component.html',
  styleUrls: ['./admin-apuestas.component.scss'],
})
export class AdminApuestasComponent implements OnInit {
  partidos: IPartido[] = [];
  formApuesta: FormGroup;
  mostrarForm: boolean = false;
  empate = { id: 0, nombre: 'Empate' };
  local = { id: 0, nombre: '' };
  visitante = { id: 0, nombre: '' };

  constructor(
    private fb: FormBuilder,
    private serPartido: PartidosService,
    private serMensaje: MensajesService,
    private serApuesta: ApuestasService) {
    this.formApuesta = this.initForm();
  }

  ngOnInit() {
    this.cargarPartidos();
  }

  initForm(): FormGroup {
    return this.fb.group({
      id_partido: ['', [Validators.required]],
      monto_empate: ['', [Validators.required]],
      monto_local: ['', [Validators.required]],
      monto_visitante: ['', [Validators.required]]
    });
  }

  cargarPartidos() {
    this.serApuesta.getPartidosSinApueta().subscribe(resp => {
      this.partidos = resp.info;
    });
  }

  elegirPartido(event: any) {
    this.mostrarForm = true;
    const data: IPartido = event.target.value;
    this.local.id = data.id_local;
    this.local.nombre = data.equipo_local;
    this.visitante.id = data.id_visitante;
    this.visitante.nombre = data.equipo_visitante;

    this.formApuesta.patchValue({
      id_partido: data.id
    });
  }

  guardar() {
    const resultado = [
      {
        id_partido: this.formApuesta.get('id_partido')?.value,
        id_ganador: null,
        monto_inv: this.formApuesta.get('monto_empate')?.value,
        estado: true
      },
      {
        id_partido: this.formApuesta.get('id_partido')?.value,
        id_ganador: this.local.id,
        monto_inv: this.formApuesta.get('monto_local')?.value,
        estado: true
      },
      {
        id_partido: this.formApuesta.get('id_partido')?.value,
        id_ganador: this.visitante.id,
        monto_inv: this.formApuesta.get('monto_visitante')?.value,
        estado: true
      }
    ];

    const data = { resultados: JSON.stringify(resultado) };
    
    this.serApuesta.crearApuesta(data).subscribe(resp => {
      if(resp.estado) {
        this.serMensaje.showToast(resp.mensaje);
      } else {
        this.serMensaje.showToast(resp.mensaje, 'secondary');
      }
      this.mostrarForm = false;
    });
  }
}
