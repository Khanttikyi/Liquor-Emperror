import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { of } from "rxjs";
import { LoadingService } from "./loading.service";
@Component({
    // moduleId: module.id,
    template: `
    <div #loadingContainer>
        
    </div>
    `,
    styleUrls: ["./loading.component.scss"],
    selector: "kbz-loading"
})
export class KBZLoadingComponent implements OnInit {
    showLoading: boolean = false
    @ViewChild('loadingContainer', { static: true }) public loadingContainer: any;
    private requestCount = 0
    // this.requestCount++;*ngIf="showLoading === true"
    inter: any;
    loadingHtml = ""
    constructor(private loadingSerice: LoadingService, private cdf: ChangeDetectorRef) {
        loadingSerice.activate = this.activate.bind(this)
        loadingSerice.deactivate = this.deactivate.bind(this)
    }

    ngOnInit() {
        this.loadingHtml = `<div id="loading-wrapper">
        <div id="loading-text">LOADING</div>
        <div id="loading-content"></div>
        </div>`
    }

    deactivate() {
        this.requestCount--
        if (this.requestCount <= 0) {
            this.showLoading = false
            this.hideLoading()
            this.cdf.detectChanges()
        }else{
            this.cdf.detectChanges()
        }
        // clearInterval(this.inter)
    }


    activate() {
        if(this.requestCount < 0){
            this.requestCount = 0
        }
        this.requestCount++
        this.showLoading = true
        if (!this.loadingContainer.nativeElement.innerHTML)
            this.appendLoading()


        // this.inter = setInterval(() => {
        //     this.deactivate()
        // }, 1000 * 60 * 3)
    }

    appendLoading() {
        this.loadingContainer.nativeElement.innerHTML = this.loadingHtml
    }
    hideLoading() {
        this.loadingContainer.nativeElement.innerHTML = null
    }



}