import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  OnInit,
  HostListener,
} from '@angular/core';

import { SplashScreenService } from './_metronic/partials/layout/splash-screen/splash-screen.service';
import { Router, NavigationEnd, NavigationError } from '@angular/router';
import { Subscription } from 'rxjs';
import { TableExtendedService } from './_metronic/shared/crud-table';
import { ProductsService } from './_metronic/core/services/products.service';
import { AuthService } from './modules/auth';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private splashScreenService: SplashScreenService,
    private router: Router,
    private tableService: TableExtendedService,
    private itemService: ProductsService,
    private authService: AuthService
  ) {

  }
  @HostListener('window:unload', ['$event'])
  beforeUnloadHandler(event) {
    // const data = this.itemService.prodSubject.getValue()
    //console.log(`I'm leaving the app!`, data);
    // localStorage.setItem("itemsData", JSON.stringify(data));
  }

  ngOnInit() {
   
    const routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // clear filtration paginations and others
        this.tableService.setDefaults();
        // hide splash screen
        this.splashScreenService.hide();

        // scroll to top on every route change
        window.scrollTo(0, 0);

        // to display back the body content
        setTimeout(() => {
          document.body.classList.add('page-loaded');
        }, 2500);
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
