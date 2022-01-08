import { Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { ITouit, ITouitResponse } from "./touit.model";
import { environment } from "src/environments/environment";

@Injectable()
export class TouitService{
    urlApi:string = environment.baseUrlApi

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

    getAvatar(username:string):Observable<any>{
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json'      
          });
        let params = new HttpParams().set("username", username)
        return this.http.get<Blob>(this.urlApi+"/avatar/get", {params:params,headers:headers, responseType:'blob' as 'json'})
        
    }

}