import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './_layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard/senior-lp-dashboard',
        loadChildren: () =>
          import('./senior-lp-dashboard/senior-lp-dashboard.module').then(
            (m) => m.SeniorLpDashboardModule
          ),
      },
      {
        path: 'product/page-group',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'config-layout',
        loadChildren: () =>
          import('./page-config/page-config.module').then((m) => m.PageConfigModule),
      },
      {
        path: 'product-form',
        loadChildren: () =>
          import('./product-form/product-form.module').then((m) => m.ProductFormModule),
      },
      {
        path: 'product/products-config',
        loadChildren: () =>
          import('./products/products.module').then((m) => m.ProductsModule),
      },
      {
        path: 'sale',
        loadChildren: () =>
          import('./quotations/quotations.module').then((m) => m.QuotationsModule),
      },
      {
        path: 'sale',
        loadChildren: () =>
          import('./policy/policy.module').then((m) => m.PolicyModule),
      },
      {
        path: 'builder',
        loadChildren: () =>
          import('./builder/builder.module').then((m) => m.BuilderModule),
      },
      {
        path: 'user-management',
        loadChildren: () =>
          import('../modules/user-management/user-management.module').then(
            (m) => m.UserManagementModule
          ),
      },
      {
        path: 'user-profile',
        loadChildren: () =>
          import('../modules/user-profile/user-profile.module').then(
            (m) => m.UserProfileModule
          ),
      },
      {
        path: 'resourse-detail',
        loadChildren: () =>
          import('./resourse-detail/resourse-detail.module').then(
            (m) => m.ResourseDetailModule
          ),
      },
      {
        path: 'currency-exchange',
        loadChildren: () =>
          import('./currency-exchange/currency-exchange.module').then(
            (m) => m.CurrencyExChangeModule
          ),
      },
      {
        path: 'activity/activity-management-list',
        loadChildren: () =>
          import('./activity-management-list/activity-management-list.module').then(
            (m) => m.ActivityManagementListModule
          ),
      },
      {
        path: 'activity/activity-management-detail',
        loadChildren: () =>
          import('./activity-management-detail/activity-management-detail.module').then(
            (m) => m.ActivityManagementDetailModule
          ),
      },
      {
        path: 'customer/customer-list',
        loadChildren: () =>
          import('./customer-list/customer-list.module').then(
            (m) => m.CustomerListModule
          ),
      },
      {
        path: 'customer/customer-detail',
        loadChildren: () =>
          import('./customer-detail/customer-detail.module').then(
            (m) => m.CustomerDetailModule
          ),
      },
      {
        path: 'lead/lead-list',
        loadChildren: () =>
          import('./lead-list/lead-list.module').then(
            (m) => m.LeadListModule
          ),
      },
      {
        path: 'lead/lead-detail',
        loadChildren: () =>
          import('./lead-detail/lead-detail.module').then(
            (m) => m.LeadDetailModule
          ),
      },
      {
        path: 'fna/fna-list',
        loadChildren: () =>
          import('./fna-list/fna-list.modules').then(
            (m) => m.FnaListModule
          ),
      },
      {
        path: 'fna/fna-detail',
        loadChildren: () =>
          import('./fna-detail/fna-detail.modules').then(
            (m) => m.FnaDetailModule
          ),
      },
      {
        path: 'fna/fna-bram',
        loadChildren: () =>
          import('./fna-bram/fna-bram.module').then(
            (m) => m.FnaBramModule
          ),
      },
      {
        path: 'report/report-detail-by-agent',
        loadChildren: () =>
          import('./report-detail-by-agent/report-detail-by-agent.module').then(
            (m) => m.ReportDetailByAgentModule
          ),
      },
      {
        path: 'report/report-detail-by-bank-branch',
        loadChildren: () =>
          import('./report-detail-by-bank-branch/report-detail-by-bank-branch.module').then(
            (m) => m.ReportDetailByBankBranchModule
          ),
      },
      {
        path: 'report/report-channel-summary-by-bank-branch',
        loadChildren: () =>
          import('./report-channel-summary-by-bank-branch/report-channel-summary-by-bank-branch.module').then(
            (m) => m.ReportChannelSummaryByBankBranchModule
          ),
      },
      {
        path: 'report/report-by-branch-summary-ai',
        loadChildren: () =>
          import('./report-by-branch-summary-ai/report-by-branch-summary-ai.module').then(
            (m) => m.ReportByBranchSummaryAiModule
          ),
      },
      {
        path: 'report/report-by-product-sales-channel-policies',
        loadChildren: () =>
          import('./report-by-product-sales-channel-policies/report-by-product-sales-channel-policies.module').then(
            (m) => m.ReportByProductSalesChannelPoliciesModule
          ),
      },
      {
        path: 'report/report-by-product-sales-channel-premium',
        loadChildren: () =>
          import('./report-by-product-sales-channel-premium/report-by-product-sales-channel-premium.module').then(
            (m) => m.ReportByProductSalesChannelPremiumModule
          ),
      },
      {
        path: 'report/report-by-product-branch-policies',
        loadChildren: () =>
          import('./report-by-product-branch-policies/report-by-product-branch-policies.module').then(
            (m) => m.ReportByProductBranchPoliciesModule
          ),
      },
      {
        path: 'report/report-by-product-branch-premium',
        loadChildren: () =>
          import('./report-by-product-branch-premium/report-by-product-branch-premium.module').then(
            (m) => m.ReportByProductBranchPremiumModule
          ),
      },
      {
        path: 'report/report-by-agent-yearly',
        loadChildren: () =>
          import('./report-by-agent-yearly/report-by-agent-yearly.module').then(
            (m) => m.ReportByAgentYearlyModule
          ),
      },
      {
        path: 'report/report-by-agent-daily',
        loadChildren: () =>
          import('./report-by-agent-daily/report-by-agent-daily.module').then(
            (m) => m.ReportByAgentDailyModule
          ),
      },
      {
        path: 'report/report-by-agent-weekly',
        loadChildren: () =>
          import('./report-by-agent-weekly/report-by-agent-weekly.module').then(
            (m) => m.ReportByAgentWeeklyModule
          ),
      },
      {
        path: 'report/report-by-agent-monthly',
        loadChildren: () =>
          import('./report-by-agent-monthly/report-by-agent-monthly.module').then(
            (m) => m.ReportByAgentMonthlyModule
          ),
      },
      {
        path: 'report/report-monthly-sales-analysis-by-branch',
        loadChildren: () =>
          import('./report-monthly-sales-analysis-by-branch/report-monthly-sales-analysis-by-branch.module').then(
            (m) => m.ReportMonthlySalesAnalysisByBranchModule
          ),
      },
      {
        path: 'report/report-weekly-sales-analysis-by-branch',
        loadChildren: () =>
          import('./report-weekly-sales-analysis-by-branch/report-weekly-sales-analysis-by-branch.module').then(
            (m) => m.ReportWeeklySalesAnalysisByBranchModule
          ),
      },
      {
        path: 'report/report-daily-sales-analysis-by-branch',
        loadChildren: () =>
          import('./report-daily-sales-analysis-by-branch/report-daily-sales-analysis-by-branch.module').then(
            (m) => m.ReportDailySalesAnalysisByBranchModule
          ),
      },
      {
        path: 'report/report-key-driver',
        loadChildren: () =>
          import('./report-key-driver/report-key-driver.module').then(
            (m) => m.ReportKeyDriverModule
          ),
      },



      {
        path: 'currency/currency-exchange',
        loadChildren: () =>
          import('./currency-exchange/currency-exchange.module').then(
            (m) => m.CurrencyExChangeModule
          ),
      },
      {
        path: 'reset-password',
        loadChildren: () =>
          import('./reset-password/reset-password.module').then(
            (m) => m.ResetPasswordModule
          ),
      },
      {
        path: '',
        redirectTo: '/product/page-group',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'error/404',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
