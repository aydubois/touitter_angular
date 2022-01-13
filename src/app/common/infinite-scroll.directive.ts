import { Directive, ElementRef, OnInit } from "@angular/core";
import { ITouit } from "../touit/touit.model";
import { TouitService } from "../touit/touit.service";
import { StateService } from "./state.service";

@Directive({
    selector:'[infinite-scroll]'
})
export class InfiniteScrollDirective implements OnInit{
    private el:HTMLElement
    private currentChildFive:Element
    private lastChild:Element

    constructor( el:ElementRef, private touitService:TouitService, private stateService:StateService){
        this.el = el.nativeElement
    }

    ngOnInit(): void {
        document.addEventListener('scroll', ()=>{
            if(this.isInViewport() && !this.same() ){
                this.lastChild = this.currentChildFive
                this.touitService.setPaginationUp(this.el.childElementCount+15)
                this.touitService.getTouits().subscribe((touits:ITouit[])=>{
                    this.stateService.updateTouits(touits)
                })
            }
        })
    }

    same(){
        return this.currentChildFive === this.lastChild
    }

    isInViewport() {
        this.currentChildFive = this.el.children?.[this.el.childElementCount-5]
        const rect = this.currentChildFive?.getBoundingClientRect();
        
        
 
        return (
            rect?.top >= 0 &&
            rect?.left >= 0 &&
            rect?.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect?.right <= (window.innerWidth || document.documentElement.clientWidth) &&
            !(rect?.width === 0 && rect?.height === 0)//if invisible ==> no touit 
        );
    }
    
}