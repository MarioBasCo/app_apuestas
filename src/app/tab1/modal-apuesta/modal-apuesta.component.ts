import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { IDetalleApuesta, IPartido, IUsuario } from 'src/app/interfaces/interfaces';
import { ApuestasService } from 'src/app/servicios/apuestas.service';
import { CuentasService } from 'src/app/servicios/cuentas.service';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { StorageService } from 'src/app/servicios/storage.service';

@Component({
  selector: 'app-modal-apuesta',
  templateUrl: './modal-apuesta.component.html',
  styleUrls: ['./modal-apuesta.component.scss'],
})
export class ModalApuestaComponent implements OnInit {
  @Input() partido!: IPartido;
  tipos: any[]=[];
  bancos:any[]=[];
  detalles: IDetalleApuesta[]=[];
  formApuesta:FormGroup;

  constructor(
    private serApuesta: ApuestasService,
    private modalCtrl: ModalController,
    private serMensaje: MensajesService,
    private serStorage: StorageService,
    private serCuentas: CuentasService,
    private fb: FormBuilder) { 
      const usr: IUsuario = this.serStorage.get('user');

      this.formApuesta = this.fb.group({
        id_usuario: [usr.id],
        id_apuesta: [0, [Validators.required]],
        id_tipo_apuesta: [0, [Validators.required]],
        id_cuenta_bco: [0, [Validators.required]],
        monto_apostado: [0, [Validators.required, Validators.min(1)]]
      });
    }

  ngOnInit() {
    const usr: IUsuario = this.serStorage.get('user');
    this.cargarMisCuentas(usr.id);
    this.cargarDetalle();
    this.cargarTipos();
  }

  cargarMisCuentas(id:number){
    this.serCuentas.getCuentasUsr(id).subscribe(resp => {
      this.bancos = resp.info;
    });
  }

  cargarDetalle(){
    let id = this.partido.id;
    this.serApuesta.getApuestaById(id).subscribe(resp=> {
      this.detalles = resp.info;
    });
  }

  cargarTipos(){
    this.serApuesta.getTipoApuesta().subscribe(resp=> {
      this.tipos = resp.info;
    });
  }

  guardar(){
    const data = this.formApuesta.value;
    this.serApuesta.apostar(data).subscribe(resp => {
      this.serMensaje.showToast(resp.mensaje, 'carbon');
      this.cerrar();
    });
  }

  cerrar(){
    this.modalCtrl.dismiss();
  }
}
