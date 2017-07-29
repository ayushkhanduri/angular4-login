import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { allComponents } from './Components';
import { UIRouterModule } from '@uirouter/angular';
import { AppComponent } from './app.component';
import { MdTooltipModule,MdInputModule, MdButtonModule , MdSnackBarModule,MdCardModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';

import { allRoutes } from './routes';
import {uiRouterConfigFn} from './routes.config';


import {HeaderComponent} from './shared/templates/header.component';
import {FooterComponent} from './shared/templates/footer.component';

import {LocalstorageService} from  './shared/services/localstorage.service';
import {NotesSevice} from './shared/services/Notes.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
  ].concat(allComponents),

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    UIRouterModule.forRoot(
      {
        states:allRoutes,
        useHash: true,
        config: uiRouterConfigFn
      }
    ),
    FormsModule,
    ReactiveFormsModule,
    MdTooltipModule,
    MdInputModule,
    MdButtonModule,
    MdSnackBarModule,
    MdCardModule
  ],
  providers: [LocalstorageService , NotesSevice],
  bootstrap: [AppComponent]
})
export class AppModule { }
