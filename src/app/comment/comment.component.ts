import { Component, Input, OnInit } from '@angular/core';
import { IAvatar } from '../avatar/avatar.model';
import { StateService } from '../common/state.service';
import { IMusic } from '../music/music.model';
import { IComment } from '../touit/touit.model';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment:IComment
  @Input() last:boolean
  @Input() first:boolean
  avatar:IAvatar
  
  musics:IMusic[]=[]

  constructor(private stateService:StateService, private userService:UserService) { }

  ngOnInit(): void {
    this.getAvatar()
  }
  getAvatar(){
    let avatars:IAvatar[] = this.stateService.avatars.value
    if(avatars.some(avatar=>avatar.name === this.comment.name)){
      this.avatar = avatars.filter(avatar=>avatar.name === this.comment.name)[0]
    }else{
      this.userService.getAvatar(this.comment.name).subscribe((avatar:any)=>{
        this.createImageFromBlob(avatar)
      })
    }
  }
  
  createImageFromBlob(image: Blob) {

    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.avatar= {
         name:this.comment.name,
         avatar:reader.result
      }
      let avatars:IAvatar[] = this.stateService.avatars.value
      if(!avatars.some(avatar=>avatar.name === this.comment.name)){
        avatars.push(this.avatar)
        this.stateService.updateAvatars(avatars)
      }
       
    }, false);
 
    if (image) {
       reader.readAsDataURL(image);
    }
    
  }
}
