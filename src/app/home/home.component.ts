import { Component, OnInit } from '@angular/core';
import { StateService } from '../common/state.service';
import { IUser } from '../user/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isConnected:boolean=false
  user:IUser
  reload:boolean=false
  constructor(private stateService:StateService) { }

  ngOnInit(): void {
    this.stateService.user.subscribe((user:IUser) =>{
      console.log(user)
      if(user?.username){
        this.user=user
        this.isConnected = true
      }
    })
  }

  // getUser(event:IUser){
  //   this.stateService.updateUser(event)
  //   this.isConnected = true
  // }

  // reloadChange(event:boolean){
  //   this.reload =event
  // }
}
