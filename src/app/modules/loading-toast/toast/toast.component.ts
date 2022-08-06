import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { KBZToastService } from "./kbz-toast.service";

@Component({
    // moduleId: module.id,
    template: `
    <div class="ngb-toasts">
    <ngb-toast
        *ngFor="let toast of toasts; index as index" 
        [autohide]="true" class="custoast"
        [delay]="toast.delay || 5000" [class]="classList[toast.type] || '' "
        (hidden)="remove(toast)"
        (click)="remove(toast)"
        >
        {{toast.message}}
    </ngb-toast>
    </div>
    `,
    styles: [`.ngb-toasts {
        position: fixed;
        top: 0;
        right: 0;
        margin: .5em;
        z-index: 1200;
        min-width: 400px;
    }
    .custoast{
        font-size:13px;
        padding-top:10px;
        padding-bottom:10px;
    }
    `],
    selector: "kbz-toast"
})
export class KBZToastComponet implements OnInit, OnDestroy {
    private defaults = {
        message: 'May the Force be with You',
        type: 'success'
    };
    classList = {
        'success': "bg-success text-light",
        'error': "bg-danger text-light",
        'noraml': ""
    }
    toasts: any = []
    // message: string
    // type: string
    private toastSubscription: Subscription;

    constructor(private kbzToastService: KBZToastService,private cdf: ChangeDetectorRef) {
        this.toastSubscription = this.kbzToastService.toastState.subscribe((toastMessage) => {
            this.activate(toastMessage.message,toastMessage.type);
        });
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.toastSubscription.unsubscribe();
    }

    activate(message = this.defaults.message, type = this.defaults.type) {
        this.toasts.push({ message, type })
        this.cdf.detectChanges()        
    }

    remove(toast) {
        this.toasts = this.toasts.filter(t => t !== toast);
        // this.cdf.detectChanges()
    }
}