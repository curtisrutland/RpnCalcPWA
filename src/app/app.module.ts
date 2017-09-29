import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { CalcButtonComponent } from './components/calc-button/calc-button.component';
import { CalculatorService } from './services/calculator.service';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    CalcButtonComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [CalculatorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
