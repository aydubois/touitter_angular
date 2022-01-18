import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/common/state.service';
import { IMusic, Player } from '../music.model';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent implements OnInit {
  music:IMusic
  Player=Player
  constructor(private stateService:StateService) { }

  ngOnInit(): void {
    this.stateService.music.subscribe((music:IMusic)=>{
      this.music = music
      console.log("musicccc", music)
      if(music.url){
        this.playMusic()
      }
    })
  }

  playMusic(){
    //
  }
}
