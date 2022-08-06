import { CommonModule } from "@angular/common";
import { NgModule, Optional, SkipSelf } from "@angular/core";
import { NgbModal, NgbModalModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";
// import { NgbToast } from "@ng-bootstrap/ng-bootstrap";
import { throwIfAlreadyLoaded } from "../module-import-guard";
import { AlertModelComponet } from "./alert-model.component";
import { AlertComponet } from "./alert.component";
import { AlertService } from "./alert.service";
@NgModule({
    imports: [CommonModule, NgbModule, NgbModalModule],
    exports: [AlertModelComponet,AlertComponet],
    declarations: [AlertModelComponet,AlertComponet],
    // providers: [AlertService]
})
export class AlertModelModule {
    constructor(@Optional() @SkipSelf() parentModule: AlertModelModule) {
        throwIfAlreadyLoaded(parentModule, 'AlertModelModule')
    }
}
