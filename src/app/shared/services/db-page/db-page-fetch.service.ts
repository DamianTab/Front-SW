import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DbPage } from '../../models/db-page';

@Injectable()
export class DbPageFetchService<ResultObject> {
  constructor(private http: HttpClient) {}

  public fetch(url: string): Promise<DbPage<ResultObject>> {
    return this.http.get<DbPage<ResultObject>>(url).toPromise();
  }
}
