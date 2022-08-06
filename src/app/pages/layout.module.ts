import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg';
import { PagesRoutingModule } from './pages-routing.module';
import {
  NgbDropdownModule,
  NgbProgressbarModule,
} from '@ng-bootstrap/ng-bootstrap';
import { LayoutComponent } from './_layout/layout.component';
import { ScriptsInitComponent } from './_layout/init/scipts-init/scripts-init.component';
import { HeaderMobileComponent } from './_layout/components/header-mobile/header-mobile.component';
import { AsideComponent } from './_layout/components/aside/aside.component';
import { FooterComponent } from './_layout/components/footer/footer.component';
import { HeaderComponent } from './_layout/components/header/header.component';
import { HeaderMenuComponent } from './_layout/components/header/header-menu/header-menu.component';
import { TopbarComponent } from './_layout/components/topbar/topbar.component';
import { ExtrasModule } from '../_metronic/partials/layout/extras/extras.module';
import { CoreModule } from '../_metronic/core';
import { SubheaderModule } from '../_metronic/partials/layout/subheader/subheader.module';
import { AsideDynamicComponent } from './_layout/components/aside-dynamic/aside-dynamic.component';
import { HeaderMenuDynamicComponent } from './_layout/components/header/header-menu-dynamic/header-menu-dynamic.component';
// import { ActivityManagementListComponent } from './activity-management-list/activity-management-list.component';
// import { ActivityManagementDetailComponent } from './activity-management-detail/activity-management-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FnaBramComponent } from './fna-bram/fna-bram.component';
import { AboutBramComponent } from './fna-bram/about-bram/about-bram.component';
import { InputsComponent } from './fna-bram/inputs/inputs.component';
import { OutputsComponent } from './fna-bram/outputs/outputs.component';
import { ProductComponent } from './fna-bram/product/product.component';
import { FnaTypeComponent } from './fna-list/fna-type/fna-type.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ReportDetailByAgentComponent } from './report-detail-by-agent/report-detail-by-agent.component';
import { ReportDetailByBankBranchComponent } from './report-detail-by-bank-branch/report-detail-by-bank-branch.component';
import { ReportChannelSummaryByBankBranchComponent } from './report-channel-summary-by-bank-branch/report-channel-summary-by-bank-branch.component';
import { ReportByBranchSummaryAiComponent } from './report-by-branch-summary-ai/report-by-branch-summary-ai.component';
import { ReportByProductSalesChannelPoliciesComponent } from './report-by-product-sales-channel-policies/report-by-product-sales-channel-policies.component';
import { ReportByProductSalesChannelPremiumComponent } from './report-by-product-sales-channel-premium/report-by-product-sales-channel-premium.component';
import { ReportByProductBranchPoliciesComponent } from './report-by-product-branch-policies/report-by-product-branch-policies.component';
import { ReportByProductBranchPremiumComponent } from './report-by-product-branch-premium/report-by-product-branch-premium.component';
import { ReportByAgentYearlyComponent } from './report-by-agent-yearly/report-by-agent-yearly.component';
import { ReportByAgentDailyComponent } from './report-by-agent-daily/report-by-agent-daily.component';
import { ReportByAgentMonthlyComponent } from './report-by-agent-monthly/report-by-agent-monthly.component';
import { ReportWeeklySalesAnalysisByBranchComponent } from './report-weekly-sales-analysis-by-branch/report-weekly-sales-analysis-by-branch.component';
import { ReportDailySalesAnalysisByBranchComponent } from './report-daily-sales-analysis-by-branch/report-daily-sales-analysis-by-branch.component';
import { ReportKeyDriverComponent } from './report-key-driver/report-key-driver.component';
import { ReportCommonSearchComponent } from './report-common-search/report-common-search.component';

@NgModule({
  declarations: [
    LayoutComponent,
    ScriptsInitComponent,
    HeaderMobileComponent,
    AsideComponent,
    FooterComponent,
    HeaderComponent,
    HeaderMenuComponent,
    TopbarComponent,
    AsideDynamicComponent,
    HeaderMenuDynamicComponent,
    FnaTypeComponent,
    // ResetPasswordComponent,
    //ReportCommonSearchComponent,
    //ReportDetailByBankBranchComponent,
    //ReportChannelSummaryByBankBranchComponent,
    //ReportByBranchSummaryAiComponent,
    //ReportByProductSalesChannelPoliciesComponent,
    // ReportByProductSalesChannelPremiumComponent,
    //ReportByProductBranchPoliciesComponent,
    //ReportByProductBranchPremiumComponent,
    //ReportByAgentYearlyComponent,
    //ReportByAgentDailyComponent,
    //ReportByAgentMonthlyComponent,
    //ReportWeeklySalesAnalysisByBranchComponent,
    //ReportDailySalesAnalysisByBranchComponent,
    //ReportKeyDriverComponent,
    //ReportDetailByAgentComponent,
    // AboutBramComponent,
    //InputsComponent,
    //OutputsComponent,
    //ProductComponent,
    //FnaBramComponent,
    //IncomeComponent,
    //HealthComponent,
    //AssetComponent,
    //EducationComponent,
    //RetirementComponent,
    //FreedomComponent,
    //ChartAnalysisComponent,
    //LlpAnalysisComponent,
    //ProductAnalysisComponent,
    //FnaListComponent,
    //FnaDetailComponent,
    // ActivityManagementListComponent,
    // ActivityManagementDetailComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    InlineSVGModule,
    ExtrasModule,
    NgbDropdownModule,
    NgbProgressbarModule,
    CoreModule,
    SubheaderModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class LayoutModule { }
