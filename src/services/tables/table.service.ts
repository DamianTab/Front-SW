import { Injectable } from '@angular/core';

@Injectable()
export class TableService { 
    async getData(dataType: string) {
        const data = []
        for(let i=0; i<1000; i++) {
            data.push(i)
        }

        return {
            /*'A': [1, 2, 'EXAMPLE_STRING', 2, 'EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING'],
            'B': [2, 3, 'EXAMPLE_STRING', 2, 'EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING'],
            'C': [3, 1, 'EXAMPLE_STRING', 2,'EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING']
            */

            'Kolumna 1': data,
            'Kolumna 2': Array.from(data).reverse(),
            'Kolumna 3': data.map(val => val + '^2'),
            'Kolumna 4': data.map(val => val + '^2').reverse()
        }
    }
}
