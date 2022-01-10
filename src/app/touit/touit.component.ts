import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
  @Input() user:IUser
  @Input() comment:IComment
  @Input() inModal:boolean = false
  @Output() openModalComment:EventEmitter<string>=new EventEmitter()
  avatar:any
  @Output() reload:EventEmitter<boolean> = new EventEmitter()

  constructor(private touitService:TouitService, private userService:UserService,  private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.userService.getAvatar(this.touit.name).subscribe((avatar:any)=>{
      this.createImageFromBlob(avatar)
    })
    this.designHashTag()
  }
  ngOnChanges(changes: SimpleChanges): void {
      if(changes?.['touit']?.currentValue !== changes?.['touit']?.previousValue){
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
       this.avatar = reader.result;
       
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
  }

  retouit(){
    if(this.user){
      let message = this.messageOriginal || this.touit.message
      message = "@"+this.user.username+" a retwouitté un touit de @"+this.touit.name+": \n "+message
      console.log(message)
      this.touitService.sendTouit(this.user.access_token, message).subscribe(res=>{
        this.reload.emit(true)
        console.log("retwouit", res)
      })
    }
  }
}
