import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { StateService } from '../common/state.service';
import { IUser } from '../user/user.model';
import { IComment, ITouit, ITouitResponse } from './touit.model';
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
  search:string
  seeMore:boolean=false
  //@Output() reloadChange:EventEmitter<boolean> = new EventEmitter()
 
  constructor(private touitService:TouitService, private stateService:StateService) { }
  ngOnInit(): void {
    this.stateService.search.subscribe((search:string)=>{
      this.search = search

      
      if(search !== ""){
        this.touit = null
        this.seeMore = false
      }
    })
    this.stateService.touits.subscribe((touits:ITouit[]) =>{
      this.touits = touits
      if(this.touit?.id){
        this.reloadTouit()
      }
    })
    this.stateService.user.subscribe((user:IUser) =>{this.user = user})
  }
  reloadTouit(){
    this.touitService.getComments(this.touit.id).subscribe((comments:{comments:IComment[]})=>{
      this.touit = this.touits.filter((touit:ITouit)=>{return touit.id === this.touit.id})[0]
      this.touit.comments = comments?.comments
    })
  }
  openModal(event:string){
    this.touit = this.touits.filter(touit => touit.id === event)[0]
    this.touitService.getComments(this.touit.id).subscribe(res=>{
      this.touit.comments = res.comments
    })
  }
  resetSearch(){
    this.stateService.updateSearch("")
    this.touitService.getTouits().subscribe((touits:ITouit[])=>{
      this.stateService.updateTouits(touits)
    })
  }
  identity(index:number,item:ITouit){
    return item.id
  }

  seeMoreTouit(touit:ITouit){
    this.touit = touit
    this.touitService.getComments(touit.id).subscribe(res=>{
      console.log(res)
      this.touit.comments = res.comments
      this.seeMore = true
    })
  }
  stopSeeMore(stop:boolean){
    this.seeMore = !stop
  }

}
