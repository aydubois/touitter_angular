export interface ITouit{
    id?:string,
    name:string,
    message:string,
    comments?:IComment[],
    ts?:number,
    likes?:number,
    comments_count?:number, 
    is_user_authenticated?:boolean
    isLiked?:boolean,
    ip?:string
}

export interface ITouitResponse{
    ts:number, 
    messages:ITouit[]
}

export interface IComment{
    name:string,
    comment:string, 
    ts?:number
}