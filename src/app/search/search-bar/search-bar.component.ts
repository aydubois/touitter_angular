import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { StateService } from 'src/app/common/state.service';
import { ITouit } from 'src/app/touit/touit.model';
import { TouitService } from 'src/app/touit/touit.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Output() isEmptySearch:EventEmitter<string> = new EventEmitter<string>()
  @ViewChild('searchBar') searchBar:ElementRef
  constructor(private stateService:StateService, private touitService:TouitService) { }

  ngOnInit(): void {
  }
  reset(){
    this.searchBar.nativeElement.value = ""
  }
  sendSearch(searchWords:string){
    this.stateService.updateOnGoingSearch(true)
    this.touitService.search(searchWords).subscribe((touits:ITouit[])=>{
      this.stateService.updateTouits(touits)
      if(touits.length === 0)
        this.isEmptySearch.emit(searchWords)

    })
  }
}
