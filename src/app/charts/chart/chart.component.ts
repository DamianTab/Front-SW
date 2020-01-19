import { Component, Input, SimpleChanges } from '@angular/core';
import { ChartService } from '../../../services/charts/chart.service' 

/* Example:
 * <sw-chart dataType="oxygen" [interval]="interval"></sw-chart>
 * 
 * Warning - dataType have to be named like the service accessor in the ChartService!!!
 * 
 * Additional attributes:
 * width - width of the graph
 * height - height of the graph
 * lineColor - color of the function
 * title - title of the graph
 * fontSize - font size of the graph title
 * shadow - shadow under the function
 * xLabel - title of the x axis
 * yLabel - title of the y axis
 */
@Component({
  selector: 'sw-chart',
  templateUrl: './chart.component.html'
})
export class ChartComponent {
    private data: any;
    private options: any;

    @Input() readonly width: string = '100vw';
    @Input() readonly height: string = '100vh';
    @Input() readonly lineColor: string = this.randomColor();
    @Input() readonly title: string = 'Oxygen';
    @Input() readonly fontSize: number = 16;
    @Input() readonly shadow: boolean = true;
    @Input() readonly xLabel: string = '';
    @Input() readonly yLabel: string = '';
    
    @Input() readonly dataType: any;
    @Input() interval: ChartService.MetaData;
    
    constructor(private service: ChartService) { }

    ngOnChanges(changes: SimpleChanges): void {

        if(changes.interval.currentValue != changes.interval.previousValue) {
            this.interval = changes.interval.currentValue
            this.ngAfterViewInit()
        }
    }

    ngAfterViewInit(): void {
        const serviceData = this.getServiceData()
        
        this.data = {
            labels: serviceData.x,
            datasets: [
                {
                    data: serviceData.y,
                    fill: this.shadow,
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
            },
            scales: {
                xAxes: [{
                    scaleLabel: {
                      display: this.xLabel !== '',
                      labelString: this.xLabel
                    }
                }],
                yAxes: [{
                  scaleLabel: {
                    display: this.yLabel !== '',
                    labelString: this.yLabel
                  }
                }]
            },
            
            responsive: true,
            maintainAspectRatio: false
        }
    }

    private getServiceData(): ChartService.Data {
        return this.service[this.dataType](this.interval)
    }

    private randomColor(): string {
        var r: number, g: number, b: number;
        r = Math.round(Math.random()*255);
        g = Math.round(Math.random()*255);
        b = Math.round(Math.random()*255);
        return this.rgb2hex(`rgba(${r}, ${g}, ${b}, 1)`)
    }

    private rgb2hex(rgb: string): string {
        var setRgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
        return "#" +
        ("0" + parseInt(setRgb[1],10).toString(16)).slice(-2) +
        ("0" + parseInt(setRgb[2],10).toString(16)).slice(-2) +
        ("0" + parseInt(setRgb[3],10).toString(16)).slice(-2);
    }
}
