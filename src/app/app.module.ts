import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './todo/list/list.component';
import { CreateComponent } from './todo/create/create.component';
import { DeleteComponent } from './todo/delete/delete.component';
import { UpdateComponent } from './todo/update/update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { DateAgoPipe } from './todo/pipe/date-ago.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CreateComponent,
    DeleteComponent,
    UpdateComponent,
    DateAgoPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
