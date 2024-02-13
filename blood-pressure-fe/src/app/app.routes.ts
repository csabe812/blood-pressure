import { Routes } from '@angular/router';
import { AddDataComponent } from './components/add-data/add-data.component';
import { HistoryComponent } from './components/history/history.component';
import { HomeComponent } from './components/home/home.component';
import { LastTenComponent } from './components/last-ten/last-ten.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add', component: AddDataComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'last-ten', component: LastTenComponent },
];
