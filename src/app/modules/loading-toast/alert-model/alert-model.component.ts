import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Subscription } from "rxjs";

@Component({
    // moduleId: module.id,
    template: `
    <div class="modal-content">
        <div class="modal-header">
            <div class="modal-title h4 left-border-image" id="example-modal-sizes-title-md">
            {{title}}
            </div>
        </div>
        <div class="modal-body">
            {{message}}
        </div>
        <div class="modal-footer">
        <button type="button" class="btn btn-light btn-elevate mr-2" (click)="modal.dismiss()">
            Cancel
        </button>
        <button type="submit" class="btn btn-primary btn-elevate" (click)="closeSuccess()">Ok</button>
        </div>
    </div>
    
    `,
    selector: "kbz-alert"
})
export class AlertModelComponet implements OnInit, OnDestroy {
    title: string
    message: string
    constructor(public modal: NgbActiveModal,) {

    }

    ngOnInit() {

    }

    closeSuccess() {
        this.modal.dismiss({ type: 'ok' })
    }

    ngOnDestroy() {

    }
}