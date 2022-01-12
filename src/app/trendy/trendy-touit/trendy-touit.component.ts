import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/common/state.service';
import { TrendService } from 'src/app/common/trend.service';
import { ITouit } from 'src/app/touit/touit.model';
import { TouitService } from 'src/app/touit/touit.service';
import { IWordTrendy } from './word-trendy.model';

@Component({
  selector: 'app-trendy-touit',
  templateUrl: './trendy-touit.component.html',
  styleUrls: ['./trendy-touit.component.scss']
})
export class TrendyTouitComponent implements OnInit {
  wordTrendy:IWordTrendy[]
  allWordTrendy:IWordTrendy[]
  max:number = 5
  trollSponsor:string
  constructor(private trendService:TrendService, private stateService:StateService, private touitService:TouitService) { }

  ngOnInit(): void {
    this.trendService.getMostUsedTerms().subscribe((words:IWordTrendy[])=>{
      this.allWordTrendy = words
      this.wordTrendy = this.allWordTrendy.slice(0,this.max)
      this.getTrollSponsor(this.wordTrendy[1])
    })
  }

  seeMore(){
    if(this.allWordTrendy.length > this.max+5){
      this.max+=5
      this.wordTrendy = this.allWordTrendy.slice(0, this.max)
    }
  }

  getTrollSponsor(word:IWordTrendy){
   this.touitService.getTrollName(word).subscribe((name:string)=>{
      this.trollSponsor = name
    })
  }

  search(word:IWordTrendy){
    this.touitService.search(word.word).subscribe((touits:ITouit[])=>{
      this.stateService.updateTouits(touits)
    })
  }
}
