import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { FireAnimationComponent } from './fire-animation/fire-animation.component';
import { GameComponent } from './game/GameComponent';
import { PlayerComponent } from './player/player.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import{ MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    StartScreenComponent,
    FireAnimationComponent,
    GameComponent,
    PlayerComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
