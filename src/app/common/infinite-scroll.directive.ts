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
    private inSearch:string=""

    constructor( el:ElementRef, private touitService:TouitService, private stateService:StateService){
        this.el = el.nativeElement
    }

    ngOnInit(): void {
        this.isInSearch()
        document.addEventListener('scroll', ()=>{
            if(this.isInViewport() && !this.same() ){
                this.lastChild = this.currentChildFive
                if(this.inSearch?.length > 0){
                    this.touitService.search(this.inSearch,this.el.childElementCount+15 ).subscribe((touits:ITouit[])=>{
                        this.stateService.updateTouits(touits)
                    })
                }else{
                    this.touitService.setPaginationUp(this.el.childElementCount+15)
                    this.touitService.getTouits().subscribe((touits:ITouit[])=>{
                        this.stateService.updateTouits(touits)
                    })
                }
            }
        })
    }

    isInSearch(){
        this.stateService.search.subscribe((search)=> this.inSearch = search)
    }
    same():boolean{
        return this.currentChildFive === this.lastChild
    }

    isInViewport():boolean {
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