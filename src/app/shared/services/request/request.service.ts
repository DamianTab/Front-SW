import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from 'src/app/shared/models/page';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private httpClient: HttpClient) { }

  //pageMaxNumber - ilość stron danych do pobrania
  //nextPage - obiekt przechowujący endpoint do ładowania kolejnych danych w tabelach

  public getMultipleStatesPages(endpoint: string, pageMaxNumber: number, nextPage?: any, params?: {page?: number, limit?: number, datetime?: {from: string, to: string}}): Observable<any> {
    return new Observable(subscriber => {
      this.httpClient.get<Page<any>>(endpoint, {params: this.setHttpParams(params)}).subscribe(data => {
        if (data.next !== null && --pageMaxNumber > 0) {
          this.getMultipleStatesPages(data.next.split(window.location.host)[1].replace(/%3A/g,':'), pageMaxNumber, nextPage).subscribe(childData => {
            subscriber.next(data.results.concat(childData));
            subscriber.complete();
          });
        } else {
          if (nextPage) {
            data.next === null ? nextPage['endpoint'] = null : nextPage['endpoint'] = data.next.split('00')[1];
          }
          subscriber.next(data.results);
          subscriber.complete();
        }
      });
    })
  }

  public getSingleStatesPage(endpoint: string, nextPage?: any, params?: {page?: number, limit?: number, datetime?: {from: string, to: string}}): Observable<any> {
    return new Observable(subscriber => {
      this.httpClient.get<Page<any>>(endpoint, {params: this.setHttpParams(params)}).subscribe(data => {
        subscriber.next(data.results);
        subscriber.complete();
      });
    });
  }

  public setOnOff(endpoint: string, body: any): Observable<any> {
    return this.httpClient.post<Observable<any>>(endpoint, body);
  }

  private setHttpParams(params: {page?: number, limit?: number, datetime?: {from: string, to: string}}):HttpParams {
    if (!params) return undefined;
    let httpParams = new HttpParams();
    if (params.page) httpParams = httpParams.append('page', params.page.toString());
    if (params.limit) httpParams = httpParams.append('limit', params.limit.toString());
    if (params.datetime) {
      httpParams = httpParams.append('from', params.datetime.from);
      httpParams = httpParams.append('to', params.datetime.to);
    }
    return httpParams;
  }
}
