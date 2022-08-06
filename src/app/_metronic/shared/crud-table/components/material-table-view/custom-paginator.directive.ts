import {
  Directive,
  Host,
  Optional,
  Renderer2,
  Self,
  ViewContainerRef,
  Input,
} from "@angular/core";
import { MatPaginator } from '@angular/material/paginator';

@Directive({
  selector: "[style-paginator]"
})
export class StylePaginatorDirective {
  private _currentPage = 1;
  private _pageGapTxt = "...";
  private _rangeStart;
  private _rangeEnd;
  directiveLoaded: boolean = false
  private _buttons = [];
  private _dumPageTotal: number
  @Input()

  get showTotalPages(): number { return this._showTotalPages; }
  // set showTotalPages(value: number) {
  //   this._showTotalPages = value % 2 == 0 ? value + 1 : value;
  // }
  private _showTotalPages = 3;

  constructor(
    @Host() @Self() @Optional() private readonly matPag: MatPaginator,
    private vr: ViewContainerRef,
    private ren: Renderer2
  ) {
    //Sub to rerender buttons when next page and last page is used
    // this.matPag.page.subscribe((v) => {
    //   this.switchPage(v.pageIndex);
    // })
  }

  private buildPageNumbers(pageCount, pageRange) {
    let dots = false;
    let dots2 = false;
    let paglast = pageCount;
    let pagcurrent = this.matPag.pageIndex;
    let rangeStart = pagcurrent - this._showTotalPages / 2;
    let rangeEnd = pagcurrent + this._showTotalPages / 2;

    for (let i = 0; i < paglast; i = i + 1) {
      if (
        (i < this._showTotalPages && pagcurrent < this._showTotalPages && i > rangeStart) ||
        (i >= rangeStart && i <= rangeEnd)
      ) {
        this.ren.insertBefore(pageRange, this.createPage(i, this.matPag.pageIndex), null);
      } else {
        if (i < rangeStart && !dots2) {
          this.ren.insertBefore(pageRange, this.createPage(this._pageGapTxt, this.matPag.pageIndex), null);
          dots2 = true;
        }
        if (i > rangeEnd && !dots) {
          this.ren.insertBefore(pageRange, this.createPage(this._pageGapTxt, this.matPag.pageIndex), null);
          dots = true;
        }
      }
    }
  }

  private createPage(i: any, pageIndex: number): any {
    const linkBtn = this.ren.createElement('mat-button');
    this.ren.addClass(linkBtn, 'mat-icon-button');
    // this.ren.addClass(linkBtn, "mat-mini-fab");
    // this.ren.setStyle(linkBtn, "margin", "1%");
    const pagingTxt = isNaN(i) ? this._pageGapTxt : +(i + 1);
    const text = this.ren.createText(pagingTxt + '');
    this.ren.addClass(linkBtn, 'mat-custom-page');
    switch (i) {
      case pageIndex:
        this.ren.setAttribute(linkBtn, 'disabled', 'disabled');
        break;
      case this._pageGapTxt:
        this.ren.setAttribute(linkBtn, 'disabled', 'disabled');
        this.ren.addClass(linkBtn, 'cus-disabled');
        break;
      default:
        this.ren.listen(linkBtn, 'click', () => {
          this._currentPage = i;
          this.switchPage(i);
        });
        break;
    }

    this.ren.appendChild(linkBtn, text);
    return linkBtn;
  }

  private initPageRange(): void {
    const pagingContainerMain = this.vr.element.nativeElement.querySelector('.mat-paginator-range-actions');

    if (
      this.vr.element.nativeElement.querySelector('div.mat-paginator-range-actions div.btn_custom-paging-container')
    ) {
      this.ren.removeChild(
        pagingContainerMain,
        this.vr.element.nativeElement.querySelector('div.mat-paginator-range-actions div.btn_custom-paging-container'),
      );
    }

    const pagingContainerBtns = this.ren.createElement('div');
    const refNode = this.vr.element.nativeElement.childNodes[0].childNodes[0].childNodes[2].childNodes[5];
    this.ren.addClass(pagingContainerBtns, 'btn_custom-paging-container');
    this.ren.insertBefore(pagingContainerMain, pagingContainerBtns, refNode);

    const pageRange = this.vr.element.nativeElement.querySelector(
      'div.mat-paginator-range-actions div.btn_custom-paging-container',
    );
    pageRange.innerHtml = '';
    let totalPageSize = this.matPag.getNumberOfPages() > 0 ? this.matPag.getNumberOfPages() : this._dumPageTotal
    const pageCount = totalPageSize;
    
    this.buildPageNumbers(pageCount, pageRange);
  }

  // private pageCount(length: number, pageSize: number): number {
  //   return Math.floor(length / pageSize) + 1;
  // }

  private switchPage(i: number): void {
    this.matPag.pageIndex = i;
    this.matPag._changePageSize(this.matPag.pageSize);
  }

  public ngAfterViewInit() {
    
  }

  public ngDoCheck() {
    if (this.directiveLoaded) {
      this.initPageRange();
    }
  }
  public viewInit(pageTotal: number) {
    // console.log("data");
    this._dumPageTotal = pageTotal
    this.initPageRange();
    setTimeout(() => {
      this.directiveLoaded = true;
    }, 500);
  }
}
