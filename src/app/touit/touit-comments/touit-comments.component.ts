import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StateService } from 'src/app/common/state.service';
import { IUser } from 'src/app/user/user.model';
import { ITouit } from '../touit.model';

@Component({
  selector: 'app-touit-comments',
  templateUrl: './touit-comments.component.html',
  styleUrls: ['./touit-comments.component.scss']
})
export class TouitCommentsComponent implements OnInit {
  @Input() touit:ITouit
  @Output() stopSeeMore:EventEmitter<boolean> = new EventEmitter()
  user:IUser
  constructor(private stateService:StateService) { }

  ngOnInit(): void {
    this.stateService.user.subscribe((user:IUser)=>{this.user = user})
  
  }

  goBack(){
    this.stopSeeMore.emit(true)
  }


}

