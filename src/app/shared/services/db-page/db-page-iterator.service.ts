import { DbPage } from '../../models/db-page';
import { DbPageFetchService } from './db-page-fetch.service';
import { Injectable } from '@angular/core';

@Injectable()
export class DbPageIterator<T> {
    private page: DbPage<T>;
    
    constructor(private retrieveData: DbPageFetchService<T>) { }

    async init(url: string): Promise<this> {
        await this.do(url);
        return this;
    }

    hasNext(): Boolean {
        return this.page.next !== null;
    }

    hasPrevious(): Boolean {
        return this.page.previous !== null;
    }

    async loadNext(): Promise<this> {
        await this.do(this.page.next);
        return this;
    }

    async loadPrevious(): Promise<this> {
        await this.do(this.page.previous);
        return this;
    }

    get results(): T[] {
        return this.page.results;
    }

    private async do(url: string): Promise<void> {
        this.page = await this.retrieveData.fetch(url).toPromise();
    }
}