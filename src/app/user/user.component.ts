import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  @Output() getUser:EventEmitter<IUser> = new EventEmitter()
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.connectForm = new FormGroup({
      username:new FormControl('Ponyo', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
      password: new FormControl('jesuisunepatate', [Validators.required, Validators.minLength(8)])
    }
    )
  }

  connect(formValues:IUser){
    this.userService.connectUser(formValues).subscribe((res:any)=>{
      this.user = {
        username:formValues.username,
        password:formValues.password,
        access_token:res?.access_token
      }
      this.errorMessage = ""

      this.getUser.emit(this.user)
    },
    (err:HttpErrorResponse)=>{
      if(err?.error?.error === "Bad username or password !"){
        this.errorMessage = "Username ou mot de passe incorrect"
      }else{
        this.errorMessage = "Oups, impossible de te connecter pour le moment. Réessaie plus tard."
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

}
