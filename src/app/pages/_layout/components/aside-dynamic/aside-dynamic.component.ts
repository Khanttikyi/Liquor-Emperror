import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { UserProfileService } from 'src/app/modules/auth/_services/user-profile.service';
import { DatabaseService } from 'src/app/_metronic/shared/crud-table/services/database.service';
import { AuthService } from '../../../../modules/auth';
import { LayoutService, DynamicAsideMenuService } from '../../../../_metronic/core';

@Component({
  selector: 'app-aside-dynamic',
  templateUrl: './aside-dynamic.component.html',
  styleUrls: ['./aside-dynamic.component.scss']
})
export class AsideDynamicComponent implements OnInit, OnDestroy {
  menuConfig: any;
  subscriptions: Subscription[] = [];

  disableAsideSelfDisplay: boolean;
  headerLogo: string;
  brandSkin: string;
  ulCSSClasses: string;
  asideMenuHTMLAttributes: any = {};
  asideMenuCSSClasses: string;
  asideMenuDropdown;
  brandClasses: string;
  asideMenuScroll = 1;
  asideSelfMinimizeToggle = false;
  role: string = ''
  currentUrl: string;
  userAccess = [
    "Administration", "Setup", "Report"
  ]
  constructor(
    private layout: LayoutService,
    private router: Router,
    private menu: DynamicAsideMenuService,
    private auth: AuthService,
    private cdr: ChangeDetectorRef,
    private databaseService: DatabaseService,
    private userService: UserProfileService) { }

  ngOnInit(): void {
    // load view settings
    this.role = this.getLoginUserRole()
    this.disableAsideSelfDisplay =
      this.layout.getProp('aside.self.display') === false;
    this.brandSkin = this.layout.getProp('brand.self.theme');
    this.headerLogo = this.getLogo();
    this.ulCSSClasses = this.layout.getProp('aside_menu_nav');
    this.asideMenuCSSClasses = this.layout.getStringCSSClasses('aside_menu');
    this.asideMenuHTMLAttributes = this.layout.getHTMLAttributes('aside_menu');
    this.asideMenuDropdown = this.layout.getProp('aside.menu.dropdown') ? '1' : '0';
    this.brandClasses = this.layout.getProp('brand');
    this.asideSelfMinimizeToggle = this.layout.getProp(
      'aside.self.minimize.toggle'
    );
    this.asideMenuScroll = this.layout.getProp('aside.menu.scroll') ? 1 : 0;
    // this.asideMenuCSSClasses = `${this.asideMenuCSSClasses} ${this.asideMenuScroll === 1 ? 'scroll my-4 ps ps--active-y' : ''}`;

    // router subscription
    this.currentUrl = this.router.url.split(/[?#]/)[0];
    const routerSubscr = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentUrl = event.url;
      this.cdr.detectChanges();
    });
    this.subscriptions.push(routerSubscr);

    // menu load
    const menuSubscr = this.menu.menuConfig$.subscribe(res => {
      if (this.userService.userInfo.userRole == 'USR') {
        for (var i = res.items.length - 1; i >= 0; i--) {
          for (var j = 0; j < this.userAccess.length; j++) {
            if (res.items[i].title === this.userAccess[j]) {
              res.items.splice(i, 1);
            }
          }
        }
      }
      this.menuConfig = res;
      this.cdr.detectChanges();
    });
    this.subscriptions.push(menuSubscr);
  }

  private getLogo() {
    return './assets/logo-02.png'
    if (this.brandSkin === 'light') {
      return './assets/media/logo_text_blue.png';
    } else {
      return './assets/media/bss_logo_white.png';
    }
  }
  getLoginUserRole() {
    console.log(this.userService.userInfo)
    return this.userService.userInfo.userRole
  }

  isMenuItemActive(path) {
    if (!this.currentUrl || !path) {
      return false;
    }

    if (this.currentUrl === path) {
      return true;
    }

    if (this.currentUrl.indexOf(path) > -1) {
      return true;
    }

    return false;
  }
  logout() {
    this.router.navigate(['auth']);
    // this.auth.logout();
    // document.location.reload();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
