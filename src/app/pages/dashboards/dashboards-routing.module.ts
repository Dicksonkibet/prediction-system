import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultComponent } from './default/default.component';
import { SaasComponent } from './saas/saas.component';
import { CryptoComponent } from './crypto/crypto.component';
import { BlogComponent } from './blog/blog.component';
import { PaymentChartComponent } from './payment-chart-component/payment-chart-component.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
    {
        path:'',
        component: HomepageComponent
    }, 
    {
        path: 'default',
        component: DefaultComponent
    },

    {
        path: 'Chart',
        component: PaymentChartComponent
    },
    {
        path: 'saas',
        component: SaasComponent
    },
    {
        path: 'crypto',
        component: CryptoComponent
    },
    {
        path: 'blog',
        component: BlogComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardsRoutingModule {}
