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
        this.touitService.getTouits().subscribe((touits:ITouit[])=>{
            this.updateTouits(touits)
        })
        setInterval(()=>{
            this.touitService.getTouits().subscribe((touits:ITouit[])=>{
                this.updateTouits(touits)
            })
        },120_000) // reload tous les 2 min
        setInterval(()=>{
            console.log("pagination into stateservice " + this.touitService.pagination)

        },2000)
    }
    updatePagination(pagination:number){
        this.touitService.setPaginationUp(pagination) // TODO : Check why 2 instance of touitService
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