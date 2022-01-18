import { Component, Input } from '@angular/core';
import { IMusic, Player } from '../music.model';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent  {
  @Input() music:IMusic
  Player=Player

}
