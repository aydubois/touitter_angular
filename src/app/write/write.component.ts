import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  @Input() user:IUser
  @Input() placeholder:string
  @Input() isTouit:boolean
  @Input() touitId:string
  @Output() reload:EventEmitter<boolean> = new EventEmitter()

  constructor(private userService:UserService, private touitService:TouitService) { }

  ngOnInit(): void {
    this.userService.getAvatar(this.user.username).subscribe((avatar:any)=>{
      this.createImageFromBlob(avatar)
    })
    this.formTouit = new FormGroup({
      message:new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(256)])
    })
  }

  createImageFromBlob(image: Blob) {

    let reader = new FileReader();
    reader.addEventListener("load", () => {
        this.user.avatar = reader.result;
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
