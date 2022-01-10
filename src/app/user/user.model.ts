export interface IUser{
    username:string, // 3 à 16 caractères
    password:string, // min 8 caractères
    access_token?:string, 
    success?:boolean,
    expiration?:string,
    avatar?:string|ArrayBuffer
}


export interface IUserResponse{
    logged_in_as:{
        name:string, 
        expiration:string //date + heure
    }
}