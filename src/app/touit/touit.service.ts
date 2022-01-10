import { Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { ITouit, ITouitResponse } from "./touit.model";
import { environment } from "src/environments/environment";

@Injectable()
export class TouitService{
    urlApi:string = environment.baseUrlApi
    authoriz:string = environment.authoriz
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

    sendTouit(authorization:string, message:string):Observable<any>{
      let body = new URLSearchParams()
      body.set('message', message)

      let httpHeaders =  new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', this.authoriz+authorization)
      
      return this.http.post<string>(this.urlApi+'/send',body.toString() , {headers:httpHeaders})
    }

}