import { Injectable } from '@angular/core';

@Injectable()
export class ChartService {

  getTemperature(meta: ChartService.MetaData): ChartService.Data {
    return {
      x: [],
      y: []
    }
  }

  getOxygen(meta: ChartService.MetaData): ChartService.Data {
    return {
      x: [1, 2, 3, 4, 5, 6, 7],
      y: [65, 59, 80, 81, 56, 55, 40]
    }
  }

  getRedox(meta: ChartService.MetaData): ChartService.Data {
    return {
      x: [],
      y: []
    }
  }

  getPH(meta: ChartService.MetaData): ChartService.Data {
    return {
      x: [],
      y: []
    }
  }
}

export namespace ChartService {
  export interface MetaData {
    begin: Date,
    end: Date,
  }

  export interface Data {
    x: number[]|string[]|Date[],
    y: number[]
  }
}