import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ITouit } from './touit.model';
import { TouitService } from './touit.service';

@Component({
  selector: 'app-touit',
  templateUrl: './touit.component.html',
  styleUrls: ['./touit.component.scss']
})
export class TouitComponent implements OnInit {
  @Input() touit:ITouit
  avatar:any
  constructor(private touitService:TouitService, private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.touitService.getAvatar(this.touit.name).subscribe((avatar:any)=>{
      this.createImageFromBlob(avatar)
    })
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
}
