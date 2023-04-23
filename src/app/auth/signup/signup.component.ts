import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { StorageService } from 'src/app/servicios/storage.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  @Output() cambioVista = new EventEmitter<boolean>();
  regForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private loadingCtrl: LoadingController,
    private serAuth: AuthService,
    private serMensaje: MensajesService,
    private serStorage: StorageService) { 
    this.regForm = this.fb.group({
      usuario: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required]]
    });
  }

  ngOnInit() {}

  async guardarRegistro(){
    const data = this.regForm.value;
    const loading = await this.loadingCtrl.create();
		await loading.present();

    this.serAuth.registro(data).subscribe(async resp => {
      await loading.dismiss();
      if(resp.estado) {
        this.serMensaje.showToast(resp.mensaje);
        this.serStorage.set('user', resp.info);
        this.router.navigateByUrl('/tabs', { replaceUrl: true });
      } else {
        this.serMensaje.showToast(resp.mensaje, 'danger');
      }
    });
  }
  
  signin() {
    this.cambioVista.emit(false);
  }

}
