import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TenderdashboardComponent } from './tenderdashboard/tenderdashboard.component';
import { TenderoverallComponent } from './tenderoverall/tenderoverall.component';
import { AppComponent } from './app.component';
import { ExpendituretypeComponent } from './expendituretype/expendituretype.component';
import { ProfitlossComponent } from './profitloss/profitloss.component';
import { ChartsComponent } from './charts/charts.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch:'full'
  },
  {
    path: 'dashboard',
    component: TenderdashboardComponent,
  },
  {
    path: 'dashboard/overall/:tendertype',
    component: TenderoverallComponent,
  },
  {
    path: 'dashboard/overall/:tendertype/report',
    component: ProfitlossComponent,
  },
  {
    path: 'dashboard/overall/:tendertype/graph',
    component: ChartsComponent,
  },
  {
    path: 'expenditures',
    component: ExpendituretypeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
