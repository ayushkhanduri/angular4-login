import { BrowserModule } from '@angular/platform-browser';
import { NgModule,ModuleWithProviders } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

import { allComponents } from './Components';
import { AppComponent } from './app.component';
import { MdTooltipModule,MdInputModule, MdButtonModule , MdSnackBarModule,MdCardModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';


import { allRoutes } from './routes';

import {HeaderComponent} from './shared/templates/header.component';
import {FooterComponent} from './shared/templates/footer.component';

import {LocalstorageService} from  './shared/services/localstorage.service';
import {NotesSevice} from './shared/services/Notes.service';
import {AuthGuardGuard} from './auth-guard.guard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
  ].concat(allComponents),

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(allRoutes,{enableTracing: true,useHash: true}),
    FormsModule,
    ReactiveFormsModule,
    MdTooltipModule,
    MdInputModule,
    MdButtonModule,
    MdSnackBarModule,
    MdCardModule
  ],
  providers: [LocalstorageService , NotesSevice,AuthGuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
