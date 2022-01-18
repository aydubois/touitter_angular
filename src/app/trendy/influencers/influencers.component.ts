import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/common/state.service';
import { TrendService } from 'src/app/common/trend.service';
import { ITouit } from 'src/app/touit/touit.model';
import { TouitService } from 'src/app/touit/touit.service';
import { IInfluencer } from './influencer.model';

@Component({
  selector: 'app-influencers',
  templateUrl: './influencers.component.html',
  styleUrls: ['./influencers.component.scss']
})
export class InfluencersComponent implements OnInit {
  influencers:IInfluencer[]

  constructor(private trendService:TrendService, private stateService:StateService, private touitService:TouitService) { }

  ngOnInit(): void {
    this.trendService.getInfluencers().subscribe((influencers:IInfluencer[])=>{
      this.influencers = influencers
    })
  }
  search(influencer:IInfluencer){
    this.touitService.search(influencer.name).subscribe((touits:ITouit[])=>{
      this.stateService.updateSearch(influencer.name)
      let touitsInfluencer = touits.filter((touit:ITouit)=>{return touit.name.toUpperCase() === influencer.name.toUpperCase()})
      this.stateService.updateTouits(touitsInfluencer)
    })
  }

}
