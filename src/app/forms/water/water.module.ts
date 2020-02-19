import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaterComponent } from './water.component';
import { DashboardModule } from '../../shared/components/dashboard/dashboard.module';
import { OxygenChartModule } from '../../shared/components/charts/oxygen-chart/oxygen-chart.module';
import { PhChartModule } from '../../shared/components/charts/ph-chart/ph-chart.module';
import { RedoxChartModule } from '../../shared/components/charts/redox-chart/redox-chart.module';
import { TemperatureChartModule } from '../../shared/components/charts/temperature-chart/temperature-chart.module';
import { TableModule } from '../../shared/components/table/table.module';
import { WaterControllerModule } from './water-controller/water-controller.module';
import { WaterRoutingModule } from './water-routing.module';
import { WaterScenarioModule } from '../water-scenario/water-scenario.module'

@NgModule({
  declarations: [WaterComponent],
  imports: [
    CommonModule,
    DashboardModule,
    OxygenChartModule,
    PhChartModule,
    RedoxChartModule,
    TemperatureChartModule,
    TableModule,
    WaterControllerModule,
    WaterScenarioModule,
    WaterRoutingModule
  ],
  exports: [WaterComponent]
})
export class WaterModule { }
