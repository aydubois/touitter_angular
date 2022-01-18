import { Directive, ElementRef, Input, OnInit } from "@angular/core";
import { IMusic, Player } from "../music/music.model";
import { TouitService } from "../touit/touit.service";
import { StateService } from "./state.service";

@Directive({
    selector:'[play-music]'
})
export class PlayMusicDirective implements OnInit{
    @Input('play-music') musics:IMusic[]
    private el:HTMLElement

    constructor( el:ElementRef){
        this.el = el.nativeElement
    }

    ngOnInit(): void {
        this.el.querySelectorAll('.addMusic').forEach((element)=>{
            this.musics.push({
                  url:this.safeUrl(element.textContent),
                player:this.getPlayer(element.textContent)
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

        if(splitTxt.length > 1){
            let id = splitTxt.pop()
            if(id.includes('watch?v=')){
                id = id.split('watch?v=')[1]
            }
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