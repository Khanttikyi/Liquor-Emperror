import { CommonModule } from "@angular/common";
import { NgModule, Optional, SkipSelf } from "@angular/core";
import { throwIfAlreadyLoaded } from "../module-import-guard";
import { KBZLoadingComponent } from "./loading.component";
import { LoadingService } from "./loading.service";

@NgModule({
    imports: [CommonModule],
    declarations: [KBZLoadingComponent],
    exports: [KBZLoadingComponent],
    providers: [LoadingService],
})
export class KBZLoadingModule {
    constructor(@Optional() @SkipSelf() parentModule: KBZLoadingModule) {
        throwIfAlreadyLoaded(parentModule, 'KBZLoadingModule')
    }
}
