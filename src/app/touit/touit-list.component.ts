import { Component, OnInit } from '@angular/core';
import { ITouit, ITouitResponse } from './touit.model';
import { TouitService } from './touit.service';

@Component({
  selector: 'app-touit-list',
  templateUrl: './touit-list.component.html',
  styleUrls: ['./touit-list.component.scss']
})
export class TouitListComponent implements OnInit {
  touits:ITouit[]
  constructor(private touitService:TouitService) { }
  ngOnInit(): void {
    this.touitService.getTouits().subscribe((touits:ITouitResponse)=>{
      let tt = touits.messages
      this.touits = []
      for (let i = 0; i < 10; i++) {
        const element = touits.messages[i];
        this.touits.push(element)
      }
    })
  }

}
