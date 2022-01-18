import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable, map } from "rxjs"
import { environment } from "src/environments/environment"
import { ITouit, ITouitResponse } from "../touit/touit.model"
import { IInfluencer } from "../trendy/influencers/influencer.model"
import { IWordTrendy } from "../trendy/trendy-touit/word-trendy.model"
import { StateService } from "./state.service"

@Injectable()
export class TrendService{
    urlApi:string = environment.baseUrlApi
    httpHeaders:HttpHeaders = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    constructor(private http:HttpClient, private stateService:StateService){}

    getMostUsedTerms():Observable<IWordTrendy[]>{
        return this.http.get<any>(this.urlApi+'/trending').pipe(
            map((res:any)=>{
                //
                let wordTrendy:IWordTrendy[] = []
                for(let key in res){
                    wordTrendy.push({
                        word:key,
                        number:res[key]
                    })
                }
                wordTrendy.sort((x:IWordTrendy,y:IWordTrendy)=>{return y.number - x.number})
                return wordTrendy
            })
        )
    }

    getInfluencers(count:number=5):Observable<IInfluencer[]>{
        let params = new HttpParams().set("count", count)

        return this.http.get<Object>(this.urlApi+'/influencers', {params:params}).pipe(
            map((res:any)=>{
                
                let influencers:IInfluencer[] = []
                for(let key in res.influencers){
                    influencers.push({
                        name:key,
                        comments:res.influencers[key].comments,
                        messages:res.influencers[key].messages,
                    })
                }
                influencers.sort((x:IInfluencer,y:IInfluencer)=>{return (y.comments + y.messages) - (x.comments + x.messages)})
                return influencers
            })
        )
    }

    getUsersCount():Observable<number>{
        return this.http.get<number>(this.urlApi+'/influencers').pipe(
            map((res:any)=>{return res.user_count })
        )
    }
    getMyPlaceInfluencer(name:string, count:number):Observable<number>{
       
        let params = new HttpParams().set("count", count)

        return this.http.get<Object>(this.urlApi+'/influencers', {params:params}).pipe(
            map((res:any)=>{
                
                let influencers:IInfluencer[] = []
                for(let key in res.influencers){
                    influencers.push({
                        name:key,
                        comments:res.influencers[key].comments,
                        messages:res.influencers[key].messages,
                    })
                }
                influencers.sort((x:IInfluencer,y:IInfluencer)=>{return (y.comments + y.messages) - (x.comments + x.messages)})

                let me = influencers.find((x:IInfluencer)=>{return x.name === name})
                if(me){
                    let index = influencers.indexOf(me)
                    return index+1
                }
                return null
            })
        ) 
    }
    getTouitsMostLiked(count:number=5):Observable<{top:ITouitResponse[]}>{
        let params = new HttpParams().set("count", count)

        return this.http.get<{top:ITouitResponse[]}>(this.urlApi+'/likes/top', {params:params})
    }

    getMyTouitMostLiked(name:string){
        return this.http.get<ITouitResponse>(this.urlApi+'/list')
            .pipe(
            map((res:ITouitResponse)=>{
                let tt:ITouit[] = res.messages.filter((x:ITouit) =>{return x.name === name && x.likes>0})
                tt.sort((x:ITouit,y:ITouit)=>{return y.likes -x.likes})
                return tt?.[0]
            })
        )
    }
    getMyTouitMostCommented(name:string){
        return this.http.get<ITouitResponse>(this.urlApi+'/list')
            .pipe(
            map((res:ITouitResponse)=>{
                let tt:ITouit[] = res.messages.filter((x:ITouit) =>{return x.name === name && x.comments_count>0})
                tt.sort((x:ITouit,y:ITouit)=>{return y.comments_count -x.comments_count})
                return tt?.[0]
            })
        )
    }
    
}
