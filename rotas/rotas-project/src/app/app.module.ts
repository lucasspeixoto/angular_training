import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

//import { CursosModule } from './cursos/cursos.module';
//import { AlunosModule } from './alunos/alunos.module';
import { AppRoutingModule } from './app-routing.module';

import { AuthService } from './login/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    //CursosModule, Deletando o import pois usaremos lazy loading
    //AlunosModule, Deletando o import pois usaremos lazy loading
    AppRoutingModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
