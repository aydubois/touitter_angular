export interface IMusic{
    url:string,
    player:Player
}

export enum Player {
    Youtube, Spotify
}