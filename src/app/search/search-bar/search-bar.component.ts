import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { StateService } from 'src/app/common/state.service';
import { ITouit } from 'src/app/touit/touit.model';
import { TouitService } from 'src/app/touit/touit.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  @Output() isEmptySearch:EventEmitter<string> = new EventEmitter<string>()
  @ViewChild('searchBar') searchBar:ElementRef
  constructor(private stateService:StateService, private touitService:TouitService) { }

  sendSearch(searchWords:string){
    this.stateService.updateSearch(searchWords)
    this.touitService.search(searchWords).subscribe((touits:ITouit[])=>{
      this.stateService.updateTouits(touits)
      this.stateService.updateSearch(searchWords)
      this.searchBar.nativeElement.value = ""
    })
  }
}
