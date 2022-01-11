import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { StateService } from '../common/state.service';
import { IUser } from '../user/user.model';
import { ITouit, ITouitResponse } from './touit.model';
import { TouitService } from './touit.service';

@Component({
  selector: 'app-touit-list',
  templateUrl: './touit-list.component.html',
  styleUrls: ['./touit-list.component.scss']
})
export class TouitListComponent implements OnInit {
  touits:ITouit[]
  touit:ITouit
  @Input() reload:boolean
  @Input() user:IUser
  @Output() reloadChange:EventEmitter<boolean> = new EventEmitter()
 
  constructor(private touitService:TouitService, private stateService:StateService) { }
  ngOnInit(): void {
    this.stateService.touits.subscribe((touits:ITouit[]) =>{this.touits = touits})
    this.stateService.user.subscribe((user:IUser) =>{this.user = user})
    // this.getTouits()
  }
  // getTouits(){
  //   this.touitService.getTouits().subscribe((touits:ITouitResponse)=>{
  //     this.touits = []
  //     for (let i = 0; i < 10; i++) {
  //       const element = touits.messages[touits.messages.length-1-i];
  //       this.touits.push(element)
  //     }
  //     console.log("get touit")
  //     this.reload = false
  //     this.reloadChange.emit(false)
  //   })
  // }
  // isReload(event:boolean){
  //   this.reload = event
  //   this.getTouits()
  // }
  // ngOnChanges(changes:SimpleChanges){
  //     console.log(changes)
  //     if(changes['reload']?.currentValue !== changes['reload']?.previousValue &&changes['reload']?.currentValue === true ){
  //       console.log("reload after retouit")
  //      this.getTouits()
  //     }
  // }

  openModal(event:string){
    this.touit = this.touits.filter(touit => touit.id === event)[0]
    this.touitService.getComments(this.touit.id).subscribe(res=>{
      this.touit.comments = res.comments
    })
  }
}
