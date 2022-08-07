import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClipboardModule } from 'ngx-clipboard';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './modules/auth/_services/auth.service';
import { environment } from 'src/environments/environment';
// Highlight JS
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { SplashScreenModule } from './_metronic/partials/layout/splash-screen/splash-screen.module';
import { HttpConfigInterceptor } from './core/httpconfig.interceptor';
import { DecimalPipe } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { NgSelectModule } from '@ng-select/ng-select';
import { IonicModule } from '@ionic/angular';
import { AddNewBrandComponent } from './pages/brand/add-new-brand/add-new-brand.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DatabaseService } from './_metronic/shared/crud-table/services/database.service';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { AddNewSubBrandComponent } from './pages/sub-brand/add-new-sub-brand/add-new-sub-brand.component';
// #fake-start#
// #fake-end#
function appInitializer(authService: AuthService) {
  return () => {
    return new Promise((resolve: any) => {
      authService.getUserByToken().subscribe().add(resolve);
    });
  };
}


@NgModule({
  declarations: [AppComponent,AddNewBrandComponent,AddNewSubBrandComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    BrowserAnimationsModule,
    SplashScreenModule,
    IonicModule,
    ReactiveFormsModule,
    HttpClientModule,
    HighlightModule,
    ClipboardModule,
    AppRoutingModule,
    InlineSVGModule.forRoot(),
    NgbModule,
    OverlayModule,
    MatTooltipModule,
    MatSelectModule,
    NgSelectModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthService],
    },
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          xml: () => import('highlight.js/lib/languages/xml'),
          typescript: () => import('highlight.js/lib/languages/typescript'),
          scss: () => import('highlight.js/lib/languages/scss'),
          json: () => import('highlight.js/lib/languages/json')
        },
      },
    },
    DecimalPipe,
    DatabaseService,
    SQLite,
    SQLitePorter,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
