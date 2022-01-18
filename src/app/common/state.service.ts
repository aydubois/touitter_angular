import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IAvatar } from "../avatar/avatar.model";
import { IMusic } from "../music/music.model";
import { ITouit, ITouitResponse } from "../touit/touit.model";
import { TouitService } from "../touit/touit.service";
import { IUser } from "../user/user.model";

@Injectable({
    providedIn:'root',
})
export class StateService{
    user:BehaviorSubject<IUser> = new BehaviorSubject(<IUser>{})
    touits:BehaviorSubject<ITouit[]> = new BehaviorSubject(<ITouit[]>[])
    avatars:BehaviorSubject<IAvatar[]> = new BehaviorSubject(<IAvatar[]>[])
    search:BehaviorSubject<string> = new BehaviorSubject(<string>"")
    onGoingSearch:boolean=false
    music:BehaviorSubject<IMusic> =new BehaviorSubject(<IMusic>{})

    constructor(private httpClient : HttpClient, private touitService:TouitService){
        this.touitService.getTouits().subscribe((touits:ITouit[])=>{
            this.updateTouits(touits)
        })
        setInterval(()=>{
            if(window.scrollY <= 100 && !this.onGoingSearch){ // check only if scroll is up && main thread
                this.touitService.getTouits().subscribe((touits:ITouit[])=>{
                    this.updateTouits(touits)
                })
            }
        },120_000) // reload tous les 2 min
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

    updateSearch(search:string){
        this.onGoingSearch =  search.length > 0
        this.search.next(search)
    }

    updateMusic(music:IMusic){
        this.music.next(music)
    }
}