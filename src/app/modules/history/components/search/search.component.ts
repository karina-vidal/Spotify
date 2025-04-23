import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: false,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  @Output() callbackData: EventEmitter<any> = new EventEmitter()
  src: string = '';
  constructor(){}

  ngOnInit(): void {
  }

  callSearch(term: string): void {
    if(term.length > 3){
      this.callbackData.emit(term)
      console.log('Lllamamos a nuestra API HTTP GET------>', term);
    }
  }

}
