import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private popoverCtrl: PopoverController) {}

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
