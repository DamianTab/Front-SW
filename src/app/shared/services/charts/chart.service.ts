import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ChartService {

  private readonly url = 'service/chart'

  constructor(private http: HttpClient) { }

  async retrieveData(dataType: string): Promise<ChartService.Data> {
    let data: ChartService.Data;
    await this.http.get(`${this.url}/${dataType}`).subscribe((recv: ChartService.Data) => data = recv)
    return data
  }

  temperature(meta: ChartService.MetaData): Promise<ChartService.Data> {
    return this.retrieveData('temperature')
  }

  oxygen(meta: ChartService.MetaData): Promise<ChartService.Data> {
    return this.retrieveData('oxygen')
  }

  redox(meta: ChartService.MetaData): Promise<ChartService.Data> {
    return this.retrieveData('redox')
  }

  pH(meta: ChartService.MetaData): Promise<ChartService.Data> {
    return this.retrieveData('pH')
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