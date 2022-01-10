import { Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { IComment, ITouit, ITouitResponse } from "./touit.model";
import { environment } from "src/environments/environment";

@Injectable()
export class TouitService{
    urlApi:string = environment.baseUrlApi
    authoriz:string = environment.authoriz
    httpHeaders:HttpHeaders = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')

    //allTouits:ITouit[] 
    constructor(private http:HttpClient){}

    private handleError<T>(operation = 'operation',result?:T){
      return (error:any):Observable<T> =>{
        console.error(error)
        return of(result as T)
      }
    }
    
    getTouits():Observable<ITouitResponse>{
        return this.http.get<ITouitResponse>(this.urlApi+'/list')
            .pipe(catchError(this.handleError<ITouitResponse>('getTouits')))
    }

    getTouit(touitId:string):Observable<Object>{
      let params = new HttpParams().set("id", touitId)
      return this.http.get<ITouitResponse>(this.urlApi+'/get', {params:params})
      .pipe(catchError(this.handleError<ITouitResponse>('getTouit')))
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
}