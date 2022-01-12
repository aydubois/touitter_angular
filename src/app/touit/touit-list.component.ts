import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { StateService } from '../common/state.service';
import { IUser } from '../user/user.model';
import { ITouit, ITouitResponse } from './touit.model';
import { TouitService } from './touit.service';

@Component({
  selector: 'app-touit-list',
  templateUrl: './touit-list.component.html',
  styleUrls: ['./touit-list.component.scss'],
  providers:[TouitService]
})
export class TouitListComponent implements OnInit {
  touits:ITouit[]
  touit:ITouit
  user:IUser
  //@Output() reloadChange:EventEmitter<boolean> = new EventEmitter()
 
  constructor(private touitService:TouitService, private stateService:StateService) { }
  ngOnInit(): void {
    this.stateService.touits.subscribe((touits:ITouit[]) =>{
      this.touits = touits
    })
    this.stateService.user.subscribe((user:IUser) =>{this.user = user})
    this.getTouits()
  }
  getTouits(){
    this.touitService.getTouits().subscribe((touits:ITouit[])=>{
      this.stateService.updateTouits(touits)
    })
  }

  openModal(event:string){
    this.touit = this.touits.filter(touit => touit.id === event)[0]
    this.touitService.getComments(this.touit.id).subscribe(res=>{
      this.touit.comments = res.comments
    })
  }

  identity(index:number,item:ITouit){
    return item.id
  }
}
