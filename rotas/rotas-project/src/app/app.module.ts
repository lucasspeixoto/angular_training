import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { CursosModule } from './cursos/cursos.module';
import { AppRoutingModule } from './app-routing.module';
import { AlunosModule } from './alunos/alunos.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CursosModule,
    AppRoutingModule,
    AlunosModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
