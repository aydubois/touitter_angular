import { AfterViewInit, Directive, ElementRef, OnInit, Pipe, PipeTransform, SecurityContext } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { StateService } from "./state.service";

@Pipe({
    name:'checkMusic'
})
export class CheckMusicPipe implements PipeTransform{
    
    constructor( private sanitizer:DomSanitizer){
    
    }

    public transform(value: any, ...args: any[]): SafeHtml  {
        let initialText:string = this.sanitizer.sanitize(SecurityContext.HTML, value) 
        let modifiedText:string
        if(initialText.includes('https://open.spotify') ||
            initialText.includes('https://youtu.be') ||
            initialText.includes('https://www.youtube.com')){
                
            let text = initialText.split("https://")
            let url:string
            let text2:string[]
            if(text[1]){
                text2 = text[1].split(" ")
                url = text2[0]                
                if(url.length>0){
                    modifiedText = text[0]+ '<span class="addMusic">'+url+'</span>'
                    if(text2[1]){
                        modifiedText = modifiedText + text2[1]
                    }
                    return this.sanitizer.bypassSecurityTrustHtml(modifiedText) 
                }
            }    
        }
        
        return this.sanitizer.bypassSecurityTrustHtml(initialText) 
    }

}