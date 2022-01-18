import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EncryptDecryptService } from '../comment/encrypt-decrypt.service';
import { StateService } from '../common/state.service';
import { IUser } from './user.model';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  connectForm:FormGroup
  errorMessage:string
  messageRegister:string
  user:IUser 
  auto:boolean=false
  constructor(private cryptService:EncryptDecryptService, private userService:UserService, private stateService:StateService) { }

  ngOnInit(): void {
    this.connectForm = new FormGroup({
      username:new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
    if(localStorage.length > 0 && localStorage.getItem('userTouitterA')&& localStorage.getItem('userTouitterB')){
      let u = localStorage.getItem('userTouitterA')
      let p = this.cryptService.decrypt(localStorage.getItem('userTouitterB'))
      this.connectForm.setValue({username:u,password:p})
      this.auto = true
      this.connect(this.connectForm.getRawValue())

    }
  }

  connect(formValues:IUser){
    this.userService.connectUser(formValues).subscribe((res:any)=>{
      this.user = {
        username:formValues.username,
        password:this.cryptService.encrypt(formValues.password),
        access_token:res?.access_token
      }
      this.errorMessage = ""
      this.stateService.updateUser(this.user)
      this.stockageStorage()
    },
    (err:HttpErrorResponse)=>{
      if(this.auto === false){
        if(err?.error?.error === "Bad username or password !"){
          this.errorMessage = "Quelque chose est incorrect. Rappelle-toi que tous les comptes sont desactivés au bout de 24h."
        }else{
          this.errorMessage = "Oups, impossible de te connecter pour le moment. Réessaie plus tard."
        }
      }
    })
  }

  register(formValues:IUser){
    this.userService.registerNewUser(formValues).subscribe((res:any)=>{
      if(res.success)
        this.messageRegister = "L'utilisateur "+formValues.username+" a bien été enregistré pour 24h."
        this.connect(formValues)
    },
    (err:HttpErrorResponse)=>{
      this.errorMessage = "Oups, impossible de t'enregistrer pour le moment. Réessaie plus tard."
    })
  }

  stockageStorage(){
    localStorage.setItem('userTouitterA',this.user.username)
    localStorage.setItem('userTouitterB',this.user.password)
  }
}
