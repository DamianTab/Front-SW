import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaterComponent } from './water.component';
import { DashboardModule } from '../../shared/components/dashboard/dashboard.module';
import { TableModule } from '../../shared/components/table/table.module';
import { WaterControllerModule } from './water-controller/water-controller.module';
import { WaterRoutingModule } from './water-routing.module';
import { WaterScenarioModule } from '../water-scenario/water-scenario.module';
import { WaterLevelC1ChartModule } from '../../shared/components/charts/water-level-C1-chart/water-level-C1-chart.module';
import { WaterLevelC2ChartModule } from '../../shared/components/charts/water-level-C2-chart/water-level-C2-chart.module';
import { WaterLevelC3ChartModule } from '../../shared/components/charts/water-level-C3-chart/water-level-C3-chart.module';
import { WaterLevelC4ChartModule } from '../../shared/components/charts/water-level-C4-chart/water-level-C4-chart.module';
import { WaterLevelC5ChartModule } from '../../shared/components/charts/water-level-C5-chart/water-level-C5-chart.module';

@NgModule({
  declarations: [WaterComponent],
  imports: [
    CommonModule,
    DashboardModule,
    WaterLevelC1ChartModule,
    WaterLevelC2ChartModule,
    WaterLevelC3ChartModule,
    WaterLevelC4ChartModule,
    WaterLevelC5ChartModule,
    TableModule,
    WaterControllerModule,
    WaterScenarioModule,
    WaterRoutingModule,
  ],
  exports: [WaterComponent]
})
export class WaterModule {}
