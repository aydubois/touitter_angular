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
    private go:boolean=true
    
    constructor( el:ElementRef, private touitService:TouitService, private stateService:StateService){
        this.el = el.nativeElement
    }

    ngOnInit(): void {
        document.addEventListener('scroll', ()=>{
            console.log(this.isInViewport(),!this.same() )
            if(this.isInViewport() && !this.same()){
                console.log("blablabla")
                this.lastChild = this.currentChildFive
                this.touitService.setPaginationUp(this.el.childElementCount+15)
                this.stateService.updatePagination(this.el.childElementCount+15)
                this.touitService.getTouits().subscribe((touits:ITouit[])=>{
                    this.stateService.updateTouits(touits)
                    console.log("count : " + touits.length)
                })
            }
            // console.log("offsetHeight", this.el.offsetHeight);
            // console.log("scrollTop", this.el.scrollTop);
            // console.log("scrollHeight", this.el.scrollHeight);
            // if (this.el.offsetHeight + this.el.scrollTop >=this.el.scrollHeight) {
            //     console.log("blah")
            // }
        })
      
    }
    same(){
        return this.currentChildFive === this.lastChild
    }
    isInViewport() {
        // console.log(rect)
        // console.log(window.innerHeight)
        // console.log(document.documentElement.clientHeight)
        
        this.currentChildFive = this.el.children?.[this.el.childElementCount-5]
       
        
        //console.log(childMinusFive)
        const rect = this.currentChildFive.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    
        );
    }
    
}