import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { CowinComponent } from './components/cowin/cowin.component';
import { StatesComponent } from './components/states/states.component';
import { WorldwideComponent } from './components/worldwide/worldwide.component';

const routes: Routes = [
  {path: '', redirectTo: '/India', pathMatch: 'full'},
  {path: 'India', component: StatesComponent},
  {path: 'WorldWide', component: WorldwideComponent},
  {path: 'About', component: AboutComponent},
  {path: 'Cowin', component: CowinComponent},
  {path: '**' , redirectTo: '/India', pathMatch: 'full'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
