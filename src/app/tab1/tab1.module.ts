import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { HomeComponent } from './home/home.component';
import { AdminApuestasComponent } from './admin-apuestas/admin-apuestas.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { PartidosComponent } from './partidos/partidos.component';
import { EquiposComponent } from './equipos/equipos.component';
import { CompeticionComponent } from './competicion/competicion.component';
import { ModalApuestaComponent } from './modal-apuesta/modal-apuesta.component';
import { ModalPartidoComponent } from './modal-partido/modal-partido.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule
  ],
  declarations: [
    Tab1Page,
    HomeComponent,
    AdminApuestasComponent,
    ResultadosComponent,
    PartidosComponent,
    EquiposComponent,
    CompeticionComponent,
    ModalApuestaComponent,
    ModalPartidoComponent
  ]
})
export class Tab1PageModule {}
