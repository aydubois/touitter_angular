import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAvatar } from '../common/avatar.model';
import { StateService } from '../common/state.service';
import { IComment, ITouit } from '../touit/touit.model';
import { TouitService } from '../touit/touit.service';
import { IUser } from '../user/user.model';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss']
})
export class WriteComponent implements OnInit {

  formTouit:FormGroup
  user:IUser
  @Input() placeholder:string
  @Input() isTouit:boolean
  @Input() touitId:string
  @Output() reload:EventEmitter<boolean> = new EventEmitter()

  constructor(private userService:UserService,private stateService:StateService, private touitService:TouitService) { }

  ngOnInit(): void {
    this.stateService.user.subscribe((user:IUser)=>{
      this.user = user
      this.getAvatar()
    })
    // this.userService.getAvatar(this.user.username).subscribe((avatar:any)=>{
    //   this.createImageFromBlob(avatar)
    // })
    this.formTouit = new FormGroup({
      message:new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(256)])
    })
  }
  getAvatar(){
    let avatars:IAvatar[] = this.stateService.avatars.value
    if(avatars.some(avatar=>avatar.name === this.user.username)){
      this.user.avatar = avatars.filter(avatar=>avatar.name === this.user.username)[0]
    }else{
      this.userService.getAvatar(this.user.username).subscribe((avatar:any)=>{
        this.createImageFromBlob(avatar)
      })
    }
  }
  createImageFromBlob(image: Blob) {

    let reader = new FileReader();
    reader.addEventListener("load", () => {
        this.user.avatar = {
          name:this.user.username,
          avatar:reader.result
        } 
        let avatars:IAvatar[] = this.stateService.avatars.value
        if(!avatars.some(avatar=>avatar.name === this.user.username)){
          avatars.push(this.user.avatar)
          this.stateService.updateAvatars(avatars)
        }
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  sendTouit(message:string){
    if(this.isTouit){
      this.touitService.sendTouit(this.user.access_token, message).subscribe(res=>{
        this.reload.emit(true)
        this.formTouit['controls']['message'].setValue('')
      })
    }else{
      let comment:IComment={
        name:this.user.username,
        comment:message
      }
      this.touitService.sendComment(this.touitId,comment).subscribe(res=>{
        this.reload.emit(true)
        this.formTouit['controls']['message'].setValue('')
      })
    }
  }

}
