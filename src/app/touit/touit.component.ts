import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IAvatar } from '../avatar/avatar.model';
import { StateService } from '../common/state.service';
import { IMusic } from '../music/music.model';
import { IUser } from '../user/user.model';
import { UserService } from '../user/user.service';
import { ITouit } from './touit.model';
import { TouitService } from './touit.service';

@Component({
  selector: 'app-touit',
  templateUrl: './touit.component.html',
  styleUrls: ['./touit.component.scss']
})
export class TouitComponent implements OnInit, OnChanges {

  user:IUser
  avatar:IAvatar
  // messageOriginal:string
  @Output() seeMoreTouit: EventEmitter<ITouit>=new EventEmitter()
  @Input() touit:ITouit
  @Input() inModal:boolean = false
  @Output() openModalComment:EventEmitter<string>=new EventEmitter()
  
  musics:IMusic[]=[]

  constructor(private touitService:TouitService, private userService:UserService, private stateService:StateService, private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.stateService.user.subscribe((user:IUser)=>{this.user = user})
    this.getAvatar()
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
        this.touit.isLiked = false
        this.touit.likes--
      })
    }else{
      this.touitService.addLike(this.touit.id).subscribe(res=>{
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
      let message = "@"+this.user.username+" a retwouitté un touit de @"+this.touit.name+": \n "+this.touit.message
      this.touitService.sendTouit(this.user.access_token, message).subscribe(res=>{

        this.touitService.getTouits().subscribe((touits:ITouit[])=>{this.stateService.updateTouits(touits)})
      })
    }
  }

  seeMore(){
    console.log("pouet")
    this.seeMoreTouit.emit(this.touit)
    window.scrollTo({top:0})

  }
}
