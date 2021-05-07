import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatesComponent } from './components/states/states.component';
import { WorldwideComponent } from './components/worldwide/worldwide.component';

const routes: Routes = [
  {path: '', component: StatesComponent},
  {path: 'IN-States', component: StatesComponent},
  {path: 'WorldWide', component: WorldwideComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
