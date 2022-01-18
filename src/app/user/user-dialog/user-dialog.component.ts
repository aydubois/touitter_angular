import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/common/state.service';
import { TrendService } from 'src/app/common/trend.service';
import { IInfluencer } from 'src/app/trendy/influencers/influencer.model';
import { IUser } from '../user.model';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {
  user:IUser
  isInfluencer:boolean=false
  topInfluencer:number=0
  constructor(private stateService:StateService, private trendService:TrendService) { }

  ngOnInit(): void {
    this.stateService.user.subscribe((user:IUser)=>{
      this.user = user
      if(user.username){
        this.checkInfluence()
      }
    })
  }

  checkInfluence(){
    this.trendService.getInfluencers(20).subscribe((influencers:IInfluencer[])=>{
      let influencerMe = influencers.find(i=>i.name === this.user.username)
      
      if(influencerMe){
        this.isInfluencer =true
        let index = influencers.indexOf(influencerMe)
        if(index < 3){this.topInfluencer = 3}
        else if(index < 10){this.topInfluencer = 10}
        else{this.topInfluencer = 20}
      }
    })
  }
}
