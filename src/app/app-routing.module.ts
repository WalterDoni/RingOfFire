import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { FireAnimationComponent } from './fire-animation/fire-animation.component';
import { GameComponent } from './game/game.component';

const routes: Routes = [
  {path:'', component: StartScreenComponent},
  {path:'', component: FireAnimationComponent},
  {path:'game', component: GameComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
