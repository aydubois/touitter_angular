import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ITouit, ITouitResponse } from './touit.model';
import { TouitService } from './touit.service';

@Component({
  selector: 'app-touit-list',
  templateUrl: './touit-list.component.html',
  styleUrls: ['./touit-list.component.scss']
})
export class TouitListComponent implements OnInit, OnChanges {
  touits:ITouit[]
  @Input() reload:boolean
  @Output() reloadChange:EventEmitter<boolean> = new EventEmitter()
  constructor(private touitService:TouitService) { }
  ngOnInit(): void {
    this.getTouits()
  }
  getTouits(){
    this.touitService.getTouits().subscribe((touits:ITouitResponse)=>{
      this.touits = []
      for (let i = 0; i < 10; i++) {
        const element = touits.messages[touits.messages.length-1-i];
        this.touits.push(element)
      }
      this.reload = false
      this.reloadChange.emit(false)
    })
  }
  ngOnChanges(changes:SimpleChanges){
      console.log(changes)
      if(changes['reload'].currentValue !== changes['reload'].previousValue &&changes['reload'].currentValue === true ){
       this.getTouits()
      }
  }
  
}
