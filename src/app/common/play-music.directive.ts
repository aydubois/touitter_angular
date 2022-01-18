import { AfterViewInit, Directive, ElementRef, OnInit } from "@angular/core";
import { IMusic, Player } from "../music/music.model";
import { TouitService } from "../touit/touit.service";
import { StateService } from "./state.service";

@Directive({
    selector:'[play-music]'
})
export class PlayMusicDirective implements AfterViewInit{
    private el:HTMLElement
    private currentChildFive:Element
    private lastChild:Element

    constructor( el:ElementRef, private touitService:TouitService, private stateService:StateService){
        this.el = el.nativeElement
    }

    ngAfterViewInit(): void {
        this.el.querySelectorAll('a.addMusic').forEach((element)=>{
            element.addEventListener("click", (event)=>{
                event.stopPropagation()
                event.preventDefault()
                console.log("plop directive music")
                let music:IMusic = {
                    url:this.safeUrl(element.textContent),
                    player:this.getPlayer(element.textContent)
                }
                this.stateService.updateMusic(music)
            })
        })
    }

    getPlayer(url:string):Player{
        if(url.includes('spotify')) return Player.Spotify
        if(url.includes('youtu.be') || url.includes('youtube')) return Player.Youtube
        return null
    }

    safeUrl(url:string):string{
        let res:string
        if(url.includes('spotify')){
            return this.safeSpotify(url)
        }
        else if(url.includes('youtu.be') || url.includes('youtube')){
            return this.safeYoutube(url)
        }
        return res
    }
    safeYoutube(url:string):string{
        let res:string="https://www.youtube.com/embed/"
        let splitTxt = url.split('/')
        console.log(splitTxt)
        if(splitTxt.length > 1){
            let id = splitTxt.pop()
            console.log("pop", id)
            if(id.includes('watch?v=')){
                console.log("yeo includes")
                id = id.split('watch?v=')[1]
            }
            console.log(id)
            return res + id
        }
        return null
    }
    safeSpotify(url:string):string{
        let res:string="https://open.spotify.com/embed/"
        let regex = /https:\/\/open\.spotify\.com\/embed\/[^\s]*/g
        if(url.match(regex)){
            return url
        }else{
            let splitTxt = url.split("spotify.com/")
            if(splitTxt[1]){
                let splitTxt2 = splitTxt[1].split("/")
                if(splitTxt2[0] === 'embed'){
                    splitTxt2.shift()
                }
                return  res + splitTxt2.join('/')
            }
            else return null

        }
    }
}