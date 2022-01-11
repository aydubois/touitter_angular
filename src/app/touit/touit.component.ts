import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IAvatar } from '../common/avatar.model';
import { StateService } from '../common/state.service';
import { IUser } from '../user/user.model';
import { UserService } from '../user/user.service';
import { IComment, ITouit } from './touit.model';
import { TouitService } from './touit.service';

@Component({
  selector: 'app-touit',
  templateUrl: './touit.component.html',
  styleUrls: ['./touit.component.scss']
})
export class TouitComponent implements OnInit, OnChanges {

  messageOriginal:string
  @Input() touit:ITouit
  //@Input() user:IUser
  user:IUser
  @Input() comment:IComment
  @Input() inModal:boolean = false
  @Output() openModalComment:EventEmitter<string>=new EventEmitter()
  avatar:IAvatar
  //@Output() reload:EventEmitter<boolean> = new EventEmitter()

  constructor(private touitService:TouitService, private userService:UserService, private stateService:StateService, private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.stateService.user.subscribe((user:IUser)=>{this.user = user})
    this.getAvatar()
    this.designHashTag()
  }
  ngOnChanges(changes: SimpleChanges): void {
      if(changes?.['touit']?.currentValue !== changes?.['touit']?.previousValue){
        this.getAvatar()
      }
  }
  getAvatar(){
    let avatars:IAvatar[] = this.stateService.avatars.value
    if(avatars.some(avatar=>avatar.name === this.touit.name)){
      this.avatar = avatars.filter(avatar=>avatar.name === this.touit.name)[0]
    }else{
      this.userService.getAvatar(this.touit.name).subscribe((avatar:any)=>{
        this.createImageFromBlob(avatar)
      })
    }
  }
  openModal(){
    this.openModalComment.emit(this.touit.id)
  }

  designHashTag(){
    if(this.touit.message.includes("#")){
      let msg = this.touit.message.split("#")
      console.log(msg)

      if(this.touit.message[0] === "#"){
        msg[0] = '<span class="hashtag">#'+msg[0]+"</span>"
      }
      for (let i = 1; i < msg.length; i++) {
        msg[i] = '<span class="hashtag">#'+msg[i]+"</span>"
      }
      this.messageOriginal = this.touit.message
      this.touit.message = msg.join(" ")
      
    }
  }

  createImageFromBlob(image: Blob) {

    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.avatar= {
         name:this.touit.name,
         avatar:reader.result
      }
      let avatars:IAvatar[] = this.stateService.avatars.value
      if(!avatars.some(avatar=>avatar.name === this.touit.name)){
        avatars.push(this.avatar)
        this.stateService.updateAvatars(avatars)
      }
       
    }, false);
 
    if (image) {
       reader.readAsDataURL(image);
    }
    
  }

  changeLike(){
    if(this.touit.isLiked){
      this.touitService.deleteLike(this.touit.id).subscribe(res=>{
        console.log(res)
        this.touit.isLiked = false
        this.touit.likes--
      })
    }else{
      this.touitService.addLike(this.touit.id).subscribe(res=>{
        console.log(res)
        this.touit.isLiked = true
        this.touit.likes++

      })
    }
    this.touitService.getTouit(this.touit.id).subscribe((res)=>{
      if(res?.data)
        this.touit = res.data
      let touits = this.stateService.touits
      let tt = touits.value.filter(touit=> touit.id === this.touit.id)[0]
      let index = touits.value.indexOf(tt)
      touits.value[index] = this.touit
      this.stateService.updateTouits(touits.value)
    })
  }

  retouit(){
    if(this.user){
      let message = this.messageOriginal || this.touit.message
      message = "@"+this.user.username+" a retwouitté un touit de @"+this.touit.name+": \n "+message
      console.log(message)
      this.touitService.sendTouit(this.user.access_token, message).subscribe(res=>{
        //this.reload.emit(true)
        console.log("retwouit", res)
      })
    }
  }
}
