import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-section-generic',
  standalone: false,
  templateUrl: './section-generic.component.html',
  styleUrl: './section-generic.component.css'
})
export class SectionGenericComponent {
  @Input() title: String = ''
  @Input() mode: 'small' | 'big' = 'big'
  @Input() dataTracks: Array<any> = []
  constructor(){}

  ngOnInit(): void{
    
  }
}
