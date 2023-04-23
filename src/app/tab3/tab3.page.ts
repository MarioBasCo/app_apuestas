import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { IUsuario } from '../interfaces/interfaces';
import { AuthService } from '../servicios/auth.service';
import { MensajesService } from '../servicios/mensajes.service';
import { StorageService } from '../servicios/storage.service';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  userForm!: FormGroup;

  constructor(private popoverCtrl: PopoverController,
    private serStorage: StorageService,
    private serMensaje: MensajesService,
    private serAuth: AuthService,
    private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      correo: [''],
      ci: [''],
      nombres: [''],
      apellidos: [''],
      direccion: [''],
      celular: ['']
    });
    this.initForm();
    this.userForm.disable();
  }

  initForm() {
    const usr: IUsuario = this.serStorage.get('user');
    if (usr) {
      this.userForm.get('correo')?.setValue(usr.correo);
      this.userForm.get('correo')?.disable();
      if (usr.ci) {
        this.userForm.get('ci')?.setValue(usr.ci);
        this.userForm.get('ci')?.disable();
      }

      if (usr.nombres) {
        this.userForm.get('nombres')?.setValue(usr.nombres);
        this.userForm.get('nombres')?.disable();
      }

      if (usr.apellidos) {
        this.userForm.get('apellidos')?.setValue(usr.apellidos);
        this.userForm.get('apellidos')?.disable();
      }

      if (usr.celular) {
        this.userForm.get('celular')?.setValue(usr.celular);
      }

      if (usr.direccion) {
        this.userForm.get('direccion')?.setValue(usr.direccion);
      }
    }
  }

  guardar() {
    const usr: IUsuario = this.serStorage.get('user');
    const data = this.userForm.value;
    this.serAuth.actualizarDatos(data, usr.id).subscribe(resp=> {
      if(resp.estado){
        this.serMensaje.showToast(resp.mensaje);
        this.serStorage.set('user',resp.info);
        this.initForm();
        this.userForm.disable();
      } else {
        this.serMensaje.showToast(resp.mensaje, 'danger');
      }
    });
  }

  editar() {
    this.userForm.enable();
    this.initForm();
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: MenuComponent,
      event: ev,
      translucent: true,
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
