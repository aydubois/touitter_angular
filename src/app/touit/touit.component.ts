import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../user/user.service';
import { IComment, ITouit } from './touit.model';
import { TouitService } from './touit.service';

@Component({
  selector: 'app-touit',
  templateUrl: './touit.component.html',
  styleUrls: ['./touit.component.scss']
})
export class TouitComponent implements OnInit, OnChanges {
  @Input() touit:ITouit
  @Input() comment:IComment
  @Input() inModal:boolean = false
  @Output() openModalComment:EventEmitter<string>=new EventEmitter()
  avatar:any
  constructor(private touitService:TouitService, private userService:UserService,  private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.userService.getAvatar(this.touit.name).subscribe((avatar:any)=>{
      this.createImageFromBlob(avatar)
    })
    this.designHashTag()
  }
  ngOnChanges(changes: SimpleChanges): void {
      if(changes['touit'].currentValue !== changes['touit'].previousValue){
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
}
