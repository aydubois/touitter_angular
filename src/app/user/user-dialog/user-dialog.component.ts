import { Component, OnInit } from '@angular/core';
import { combineLatest, combineLatestWith, Observable } from 'rxjs';
import { StateService } from 'src/app/common/state.service';
import { TrendService } from 'src/app/common/trend.service';
import { ITouit } from 'src/app/touit/touit.model';
import { IInfluencer } from 'src/app/trendy/influencers/influencer.model';
import { IUser } from '../user.model';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {
  isExtend:boolean=false

  user:IUser
  isInfluencer:boolean=false
  topInfluencer:number=0
  nbUsers:number
  myPlace:number
  maxLikedTouit:ITouit
  maxCommentedTouit:ITouit
  constructor(private stateService:StateService, private trendService:TrendService) { }

  ngOnInit(): void {
    
    let sub1 = this.trendService.getUsersCount()
    let sub2 = this.stateService.user
    combineLatest([sub1, sub2]).subscribe(([nbUsers,user]:[number,IUser]) => {
      this.user = user
      this.nbUsers=nbUsers
        if(user.username){
          this.checkInfluence()
        }
    })
    
  }

  checkInfluence(){

    this.trendService.getMyPlaceInfluencer(this.user.username, this.nbUsers).subscribe((num:number)=>{
      this.myPlace = num
      this.isInfluencer = true
      if(num > 20){
        this.isInfluencer = false
        this.topInfluencer=null
      }else if(num >10){
        this.topInfluencer=20
      }else if(num >5){
        this.topInfluencer=10
      }else{
        this.topInfluencer=3
      }
    })
    this.trendService.getMyTouitMostLiked(this.user.username).subscribe((touit:ITouit)=>this.maxLikedTouit=touit)
    this.trendService.getMyTouitMostCommented(this.user.username).subscribe((touit:ITouit)=>this.maxCommentedTouit=touit)
  }

  handleClick(){this.isExtend = !this.isExtend}
}
