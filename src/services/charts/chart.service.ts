import { Injectable } from '@angular/core';

enum Units {
  month,
  week,
  hours
}
@Injectable()
export class ChartService {
  static readonly Units = Units;

  constructor() { }

  getTemperature(begin: Date, end: Date, unit: Units): any {
    return {
      x: [],
      y: []
    }
  }

  getOxygen(begin: Date, end: Date, unit: Units): any {
    return {
      x: [1, 2, 3, 4, 5, 6, 7],
      y: [65, 59, 80, 81, 56, 55, 40]
    }
  }

  getRedox(begin: Date, end: Date, unit: Units): any {
    return {
      x: [],
      y: []
    }
  }

  getPH(begin, end, unit): any {
    return {
      x: [],
      y: []
    }
  }
}
