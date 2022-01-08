export interface ITouit{
    id:string,
    name:string,
    message:string,
    ts:number,
    likes:number,
    comments_count:number, 
    is_user_authenticated:boolean
}

export interface ITouitResponse{
    ts:number, 
    messages:ITouit[]
}