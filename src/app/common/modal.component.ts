import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";

@Component({
    selector:'modal',
    template:`
    <div id="{{elementId}}" #modalContainer class="modal fade" hidden tabindex="-1">
        <div class="modal-dialog" #modalDialog>
            <div class="modal-content">
                <div class="modal-header">
                    <button class="close" type="button" (click)="closeModal(true)">
                        <span>&times;</span>
                    </button>
                    <h4 class="modal-title" *ngIf="title && title.length > 0">{{title}}</h4>
                </div>
                <div class="modal-body" (click)="closeModal()">
                    <ng-content></ng-content>
                </div>
            </div>
        </div>
    </div>
    `,
    styles:[
        `
        .modal{
            position: fixed;
            background-color: #5b708366;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
        }
        button.close{
            display: block;
            font-size: 2rem;
            background: none;
            padding: 0;
            margin: 0 1rem 0 auto;
            span{
                color: var(--green);
            }
        } 
        .modal-dialog{
            width: 600px;
            background-color: var(--black);
            margin: 10% auto;
            z-index: 10;
        }
        .modal-body{
            min-height: 250px;
        }
        *{color:white;}`
    ]
})
export class ModalComponent implements AfterViewInit{
    @Input() title:string
    @Input() elementId:string
    @Input() closeOnBodyClick:string

    @ViewChild('modalContainer') containerEl:ElementRef
    @ViewChild('modalDialog') dialogEl:ElementRef
    constructor(){}
    ngAfterViewInit(): void {
        let modal = document.querySelector('modal')
        modal.addEventListener('click', ()=>{
            if(!this.containerEl.nativeElement.hidden){
                this.closeModal(true)
            }
        })
        this.dialogEl.nativeElement.addEventListener("click", (evt:MouseEvent) => {
            evt.stopPropagation()
        })
          
    }
    closeModal(force?:boolean){
        if(this.closeOnBodyClick.toLocaleLowerCase() === 'true' || force){
            this.containerEl.nativeElement.hidden = true
        }
    }
}