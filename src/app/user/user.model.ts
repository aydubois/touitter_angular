import { IAvatar } from "../avatar/avatar.model";

export interface IUser{
    username:string, // 3 à 16 caractères
    password:string, // min 8 caractères // encrypt
    access_token?:string, 
    success?:boolean,
    expiration?:string,
    avatar?:IAvatar
}


export interface IUserResponse{
    logged_in_as:{
        name:string, 
        expiration:string //date + heure
    }
}