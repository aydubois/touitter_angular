import { Component, ComponentRef, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StateService } from '../common/state.service';
import { ITouit } from '../touit/touit.model';
import { TouitService } from '../touit/touit.service';
import { IUser } from '../user/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isConnected:boolean=false
  user:IUser
  emptySearch:string=""

  constructor(private stateService:StateService,private touitService:TouitService) { }

  ngOnInit(): void {
    this.stateService.user.subscribe((user:IUser) =>{
      console.log(user)
      if(user?.username){
        this.user=user
        this.isConnected = true
      }
    })
  }

  isEmptySearch(searchWorld:string){
    console.log("isEmptySearch")
    this.emptySearch = searchWorld
  }

  resetSearch(){
    
    this.emptySearch = ""
    this.touitService.getTouits().subscribe((touits:ITouit[])=>{
      this.stateService.updateTouits(touits)
    })
  }
}
