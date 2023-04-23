import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { IBanco, ITipoCta, IUsuario } from 'src/app/interfaces/interfaces';
import { CuentasService } from 'src/app/servicios/cuentas.service';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { StorageService } from 'src/app/servicios/storage.service';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.scss'],
})
export class TarjetasComponent implements OnInit {
  formCta: FormGroup;
  bancos: IBanco[]=[];
  tiposCtas: ITipoCta[]=[];

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController, private serCtas: CuentasService,
    private serMensaje: MensajesService,
    private serCta: CuentasService,
    private serStorage: StorageService) {
    const usr: IUsuario = this.serStorage.get('user'); 
    this.formCta =  this.fb.group({
      id_usuario: [usr.id],
      id_banco: ['', [Validators.required]],
      id_tipo_cta: ['', [Validators.required]],
      num_cta: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.cargarBancos();
    this.cargarTipoCtas();
  }

  cargarBancos(){
    this.serCtas.getBancos().subscribe(resp=> {
      this.bancos = resp.info;
    });
  }

  cargarTipoCtas(){
    this.serCtas.getTipoCta().subscribe(resp=> {
      this.tiposCtas = resp.info;
    });
  }

  guardar(){
    const data = this.formCta.value;
    this.serCta.nuevaCta(data).subscribe(resp => {
      this.serMensaje.showToast(resp.mensaje, 'secondary');
      this.modalCtrl.dismiss();
    });
  }

  cerrarModal(){
    this.modalCtrl.dismiss()
  }
}
