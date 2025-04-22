import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryRoutingModule } from '@modules/history/history-routing.module';
import { HistoryPageComponent } from '@modules/history/pages/history-page/history-page.component';
import { SearchComponent } from './components/search/search.component';


@NgModule({
  declarations: [
    HistoryPageComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    HistoryRoutingModule
  ]
})
export class HistoryModule { }
