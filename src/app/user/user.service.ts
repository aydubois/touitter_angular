import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { IUser, IUserResponse } from "./user.model";

@Injectable()
export class UserService{
    urlApi:string = environment.baseUrlApi
    httpHeaders:HttpHeaders = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    constructor(private http:HttpClient){}

    registerNewUser(user:IUser):Observable<IUser>{
        
        let body = new URLSearchParams()
        body.set('username', user.username)
        body.set('password', user.password)
        return this.http.post<IUser>(this.urlApi+'/user/register',body.toString() , {headers:this.httpHeaders})
        
    }
    
    connectUser(user:IUser):Observable<string>{
        let body = new URLSearchParams()
        body.set('username', user.username)
        body.set('password', user.password)
        return this.http.post<string>(this.urlApi+'/user/login',body.toString() , {headers:this.httpHeaders})
       
    }

    userInfo(authorization:string):Observable<IUserResponse>{
        let params = new HttpParams().set("authorization", authorization)
        return this.http.get<IUserResponse>(this.urlApi+'/user/me', {params:params})
         
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