import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ITouit, ITouitResponse } from "../touit/touit.model";
import { TouitService } from "../touit/touit.service";
import { IUser } from "../user/user.model";
import { IAvatar } from "./avatar.model";

@Injectable({
    providedIn:'root'
})
export class StateService{
    user:BehaviorSubject<IUser> = new BehaviorSubject(<IUser>{})
    touits:BehaviorSubject<ITouit[]> = new BehaviorSubject(<ITouit[]>[])
    avatars:BehaviorSubject<IAvatar[]> = new BehaviorSubject(<IAvatar[]>[])
    constructor(private httpClient : HttpClient, private touitService:TouitService){
        this.getTouits()
        setInterval(()=>{
            this.getTouits()
        },120_000) // reload tous les 2 min
    }
    getTouits(){
        this.touitService.getTouits().subscribe((touits:ITouitResponse)=>{
            let tt:ITouit[] = touits.messages.sort((x,y) =>{return y.ts - x.ts})
            tt = tt.slice(0,10)
            this.updateTouits(tt)
        })
    }

    updateUser(user:IUser){
        this.user.next(user)    
    }

    updateTouits(touits:ITouit[]){
        this.touits.next(touits)
    }
    updateAvatars(avatars:IAvatar[]){
        console.log(avatars)
        this.avatars.next(avatars)
    }
}