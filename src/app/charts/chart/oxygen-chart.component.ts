import { Component, Input } from '@angular/core';
import { ChartService } from '../../../services/charts/chart.service' 

@Component({
  selector: 'sw-chart-oxygen',
  templateUrl: './oxygen-chart.component.html',
  styleUrls: ['./oxygen-chart.component.scss']
})
export class OxygenChartComponent {
    readonly data: any;
    readonly options: any;
    @Input() readonly width: string = '100vw';
    @Input() readonly height: string = '100vh';
    @Input() readonly lineColor: string = 'red';
    @Input() readonly title: string = 'Oxygen';
    @Input() readonly fontSize: number = 16;
    
    constructor(private service: ChartService) {
        var oxygen = this.service.getOxygen(new Date('1/1/2020'), new Date('7/1/2020'), ChartService.Units.week)
        
        this.data = {
            labels: oxygen.x,
            datasets: [
                {
                    data: oxygen.y,
                    fill: true,
                    borderColor: this.lineColor
                }
            ]
        }

        this.options = {
            title: {
                display: this.title !== '',
                text: this.title,
                fontSize: this.fontSize
            },
            legend: {
                display: false
            }
        }
    }

    selectData(event: Event): void {
        //event.dataset = Selected dataset
        //event.element = Selected element
        //event.element._datasetIndex = Index of the dataset in data
        //event.element._index = Index of the data in dataset
    }
}
