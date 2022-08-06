import { CommonModule } from "@angular/common";
import { NgModule, Optional, SkipSelf } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
// import { NgbToast } from "@ng-bootstrap/ng-bootstrap";
import { throwIfAlreadyLoaded } from "../module-import-guard";
import { KBZToastService } from "./kbz-toast.service";
import { KBZToastComponet } from "./toast.component";
@NgModule({
    imports: [CommonModule,NgbModule],
    exports: [KBZToastComponet],
    declarations: [KBZToastComponet],
    providers: [KBZToastService],
})
export class KBZToastModule {
    constructor(@Optional() @SkipSelf() parentModule: KBZToastModule) {
        throwIfAlreadyLoaded(parentModule, 'KBZToastModule')
    }
}
