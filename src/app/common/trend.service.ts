import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable, map } from "rxjs"
import { environment } from "src/environments/environment"
import { ITouitResponse } from "../touit/touit.model"
import { IWordTrendy } from "../trendy/trendy-touit/word-trendy.model"

@Injectable()
export class TrendService{
    urlApi:string = environment.baseUrlApi
    httpHeaders:HttpHeaders = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    constructor(private http:HttpClient){}

    getMostUsedTerms():Observable<IWordTrendy[]>{
        return this.http.get<any>(this.urlApi+'/trending').pipe(
            map((res:any)=>{
                console.log(typeof res)
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

    getInfluencers():Observable<Object>{
        return this.http.get<Object>(this.urlApi+'/influencers')
    }

    getTouitsMostLiked(count:number):Observable<{top:ITouitResponse[]}>{
        let params = new HttpParams().set("count", count)

        return this.http.get<{top:ITouitResponse[]}>(this.urlApi+'/influencers', {params:params})
    }
    
}
