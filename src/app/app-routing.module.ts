import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DistrictsComponent } from './components/districts/districts.component';
import { StatesComponent } from './components/states/states.component';

const routes: Routes = [
  {path: '', component: StatesComponent},
  {path: 'States-Dashboard', component: StatesComponent},
  {path: 'Districts-Dashboard', component: DistrictsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
