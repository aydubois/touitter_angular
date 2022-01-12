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
    onGoingSearch:boolean=false
    constructor(private httpClient : HttpClient, private touitService:TouitService){
        this.touitService.getTouits().subscribe((touits:ITouit[])=>{
            this.updateTouits(touits)
        })
        setInterval(()=>{
            if(window.scrollY <= 100 && !this.onGoingSearch){ // check only if scroll is up
                this.touitService.getTouits().subscribe((touits:ITouit[])=>{
                    this.updateTouits(touits)
                })
            }
        },120_000) // reload tous les 2 min
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
        this.avatars.next(avatars)
    }
    updateOnGoingSearch(bool:boolean){
        this.onGoingSearch = bool
    }
}