import { Routes } from '@angular/router';
import { AddDataComponent } from './add-data/add-data.component';
import { HomeComponent } from './home/home.component';
import { HistoryComponent } from './history/history.component';
import { LastTenComponent } from './last-ten/last-ten.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add', component: AddDataComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'last-ten', component: LastTenComponent },
];
