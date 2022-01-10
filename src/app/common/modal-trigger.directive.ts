import { Directive, ElementRef, Inject, Input, OnInit } from "@angular/core";

@Directive({
    selector:'[modal-trigger]', 
})
export class ModalTriggerDirective implements OnInit{
    private el:HTMLElement
    @Input('modal-trigger') modalId:string  
    constructor( el:ElementRef){
        this.el = el.nativeElement
    }
    ngOnInit(): void {
        this.el.addEventListener('click',e =>{
            document.getElementById(this.modalId).hidden = false
        })
    }
}

@Directive({
    selector:'[modal-close]', 
})
export class ModalTriggerCloseDirective implements OnInit{
    private el:HTMLElement
    @Input('modal-close') modalId:string  
    constructor( el:ElementRef){
        this.el = el.nativeElement
    }
    ngOnInit(): void {
        this.el.addEventListener('click',e =>{
            setTimeout(()=>{

                document.getElementById(this.modalId).hidden = true
            },500)
        })
    }
}