import { Inject, Injectable } from "@angular/core";
import { catchError, Observable, of, map } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { IComment, ITouit, ITouitResponse } from "./touit.model";
import { environment } from "src/environments/environment";
import { StateService } from "../common/state.service";
import { IWordTrendy } from "../trendy/trendy-touit/word-trendy.model";

@Injectable({providedIn:'root'})
export class TouitService{
    urlApi:string = environment.baseUrlApi
    authoriz:string = environment.authoriz
    httpHeaders:HttpHeaders = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    pagination:number=15
    //allTouits:ITouit[] 
    constructor(private http:HttpClient){}

    private handleError<T>(operation = 'operation',result?:T){
      return (error:any):Observable<T> =>{
        console.error(error)
        return of(result as T)
      }
    }
    
    setPaginationUp(pagination:number){
      this.pagination=pagination
    }
    getTouits():Observable<ITouit[]>{
        return this.http.get<ITouitResponse>(this.urlApi+'/list')
            .pipe(
              map((res:ITouitResponse)=>{
              let tt:ITouit[] = res.messages.sort((x,y) =>{return y.ts - x.ts})
              if(this.pagination < res.messages.length){
                tt =  tt.slice(0,this.pagination)
              }
              return tt
            })
          )
    }
    getTrollName(word:IWordTrendy):Observable<string>{ //nom de la personne ayant le + touitter le 2eme mot en tendance
      return this.http.get<ITouitResponse>(this.urlApi+'/list')
          .pipe(
            map((res:ITouitResponse)=>{
            let tt:ITouit[] = res.messages.sort((x,y) =>{return y.ts - x.ts})
            
            //Recherche de tous les touits avec le mot tendance
            tt = tt.filter((touit:ITouit)=>{
              return touit.message.includes(word.word)
             })

            //Compteur des auteurs des touits
             let counts = tt.reduce((p:any, c) => {
               var name = c.name;
               if (!p.hasOwnProperty(name)) {
                 p[name] = 0;
               }
               p[name]++;
               return p;
             }, {});

            // Recupération de l'auteur le plus troll
            let nameTroll:string
            let best:number = 1
            for(let data in counts){
              if(counts[data] > best){
                best = counts[data]
                nameTroll = data
              }
            }

            return nameTroll
          })
        )
  }
    getTouit(touitId:string):Observable<{success:boolean, data:ITouit}>{
      let params = new HttpParams().set("id", touitId)
      return this.http.get<{success:boolean, data:ITouit}>(this.urlApi+'/get', {params:params})
      .pipe(catchError(this.handleError<{success:boolean, data:ITouit}>('getTouit')))
    }

    
    sendTouit(authorization:string, message:string):Observable<any>{
      let body = new URLSearchParams()
      body.set('message', message)
      
      let httpHeaders =  new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', this.authoriz+authorization)
      
      return this.http.post<string>(this.urlApi+'/send',body.toString() , {headers:httpHeaders})
    }
    getComments(touitId:string):Observable<{comments:IComment[]}>{
      let params = new HttpParams().set("message_id", touitId)
      return this.http.get<{comments:IComment[]}>(this.urlApi+'/comments/list', {params:params})
      .pipe(catchError(this.handleError<{comments:IComment[]}>('getComments')))
    }

    sendComment(touitId:string, comment:IComment):Observable<Object>{
      let body = new URLSearchParams()
      body.set('message_id', touitId)
      body.set('name', comment.name)
      body.set('comment', comment.comment)

      return this.http.post<Object>(this.urlApi+'/comments/send',body.toString() , {headers:this.httpHeaders})
    
    }
    addLike(touitId:string):Observable<Object>{
      let body = new URLSearchParams()
      body.set('message_id', touitId)
      return this.http.put<Object>(this.urlApi+"/likes/send", body.toString(), {headers:this.httpHeaders})
    }
    deleteLike(touitId:string):Observable<Object>{
      let body = new URLSearchParams()
      body.set('message_id', touitId)
      return this.http.delete<Object>(this.urlApi+"/likes/remove",{body: body.toString(), headers:this.httpHeaders})
    }


    search(searchWorld:string):Observable<ITouit[]>{
      this.pagination = 30
      return this.http.get<ITouitResponse>(this.urlApi+'/list')
          .pipe(
            map((res:ITouitResponse)=>{
            let tt:ITouit[] = res.messages.sort((x,y) =>{return y.ts - x.ts})
            tt = tt.filter((touit:ITouit)=>{return touit.name.toUpperCase() === searchWorld.toUpperCase() || touit.message.toUpperCase().includes(searchWorld.toUpperCase())})
            if(this.pagination < res.messages.length){
              tt =  tt.slice(0,this.pagination)
            }
            return tt
          })
        )
  }
}