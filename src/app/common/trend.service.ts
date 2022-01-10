import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { environment } from "src/environments/environment"
import { ITouitResponse } from "../touit/touit.model"

@Injectable()
export class TrendService{
    urlApi:string = environment.baseUrlApi
    httpHeaders:HttpHeaders = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    constructor(private http:HttpClient){}

    getMostUsedTerms():Observable<Object>{
        return this.http.get<Object>(this.urlApi+'/trending')
    }

    getInfluencers():Observable<Object>{
        return this.http.get<Object>(this.urlApi+'/influencers')
    }

    getTouitsMostLiked(count:number):Observable<{top:ITouitResponse[]}>{
        let params = new HttpParams().set("count", count)

        return this.http.get<{top:ITouitResponse[]}>(this.urlApi+'/influencers', {params:params})
    }
    
}
