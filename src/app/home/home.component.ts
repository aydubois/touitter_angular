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
  search:string=""
  constructor(private stateService:StateService,private touitService:TouitService) { }

  ngOnInit(): void {
    this.stateService.user.subscribe((user:IUser) =>{
      if(user?.username)
        this.isConnected = true
      else
        this.isConnected = false
      this.user=user
      console.log(this)
    })

    this.stateService.search.subscribe((search:string)=>{
      this.search = search
    })
  }

  goTop(){
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
