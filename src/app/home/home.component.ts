import { Component, OnInit } from '@angular/core';
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
  constructor() { }

  ngOnInit(): void {
  }

  getUser(event:IUser){
    this.user = event
    this.isConnected = true
  }

  reloadChange(event:boolean){
    this.reload =event
  }
}
