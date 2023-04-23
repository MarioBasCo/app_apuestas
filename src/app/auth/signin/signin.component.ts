import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { StorageService } from 'src/app/servicios/storage.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  @Output() cambioVista = new EventEmitter<boolean>();
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private loadingCtrl: LoadingController,
    private serMensaje: MensajesService,
    private serAuth: AuthService,
    private serStorage: StorageService) { 
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required]]
    });
  }

  ngOnInit() {}

  async ingresar(){
    const data = this.loginForm.value;
    const loading = await this.loadingCtrl.create();
		await loading.present();

    this.serAuth.login(data).subscribe(async resp => {
      await loading.dismiss();
      if(resp.estado){
        this.serStorage.set('user', resp.info);
        this.router.navigateByUrl('/tabs', { replaceUrl: true });
      } else {
        this.serMensaje.showToast(resp.mensaje,'danger');
      }
    });
  }

  signup() {
    this.cambioVista.emit(true);
  }
}
