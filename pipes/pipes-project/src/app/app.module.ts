import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExemplosPipesComponent } from './exemplos-pipes/exemplos-pipes.component';
import { CamelCasePipe } from './camel-case.pipe';
import { SettingsService } from './services/settings.service'

//Locale imports
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { FiltroArrayPipe } from './filtro-array.pipe';
import { FiltroArrayImpuroPipe } from './filtro-array-impuro.pipe';
registerLocaleData(localePt)

@NgModule({
  declarations: [
    AppComponent,
    ExemplosPipesComponent,
    CamelCasePipe,
    FiltroArrayPipe,
    FiltroArrayImpuroPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    // {
    // provide: LOCALE_ID,
    // useValue: 'pt-BR',
    // //useClass: '',
    // //useFactory:''
    // },
  SettingsService,
  {
    //Obtendo via serviço
    provide: LOCALE_ID,
    deps: [SettingsService],
    useFactory: (settingsService: any) => settingsService.getLocale()
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
