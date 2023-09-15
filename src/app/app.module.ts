import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { FireAnimationComponent } from './fire-animation/fire-animation.component';
import { GameComponent } from './game/game.component';


@NgModule({
  declarations: [
    AppComponent,
    StartScreenComponent,
    FireAnimationComponent,
    GameComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
