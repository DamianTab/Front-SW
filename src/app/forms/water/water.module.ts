import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaterComponent } from './water.component';
import { DashboardModule } from '../../shared/components/dashboard/dashboard.module';
import { TableModule } from '../../shared/components/table/table.module';
import { WaterControllerModule } from './water-controller/water-controller.module';
import { WaterRoutingModule } from './water-routing.module';
import { WaterScenarioModule } from '../water-scenario/water-scenario.module';
import {ChartWidgetModule} from '../../shared/components/charts/chart-widget/chart-widget.module';

@NgModule({
  declarations: [WaterComponent],
    imports: [
        CommonModule,
        DashboardModule,
        TableModule,
        WaterControllerModule,
        WaterScenarioModule,
        WaterRoutingModule,
        ChartWidgetModule,
    ],
  exports: [WaterComponent]
})
export class WaterModule {}
