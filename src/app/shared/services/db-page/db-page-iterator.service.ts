import { DbPage } from '../../models/db-page';
import { DbPageFetchService } from './db-page-fetch.service';
import { Component } from '@angular/core';

@Component({})
export class DbPageIterator<T> {
    private page: DbPage<T>;
    private tasks: any[] = [];

    constructor(private retrieveData: DbPageFetchService<T>,
        private onErrorContinue: boolean = false
        ) {
        const emptyTask = (async () => { })();
        this.tasks.push(emptyTask);
    }

    //load only one page on url
    init(url: string, callback?: Function, errorCallback?: Function): this {
        this.addSyncTask(async () => {
            await this.download(url, callback, errorCallback);
        });
        return this;
    }

    //load all pages on source url
    loadAll(url: string, callback?: Function, errorCallback?: Function): this {
        this.addSyncTask(async () => {
            const it = new DbPageIterator<T>(this.retrieveData);

            it.init(url, callback, errorCallback);
            this.page = {
                'count': it.page.count,
                'next': it.page.next,
                'previous': it.page.previous,
                'results': []
            };
            const start = it.results;

            const prev = [], next = [];
            while (it.hasNext()) {
                it.loadNext(() => next.push(...it.results), 1, errorCallback);
            }

            it.init(url, callback, errorCallback);
            while (it.hasPrevious()) {
                it.loadPrevious(() => prev.push(...it.results), 1, errorCallback);
            }

            this.page.results = [...prev, ...start, ...next];
        });
        return this;
    }

    loadNext(callback?: Function, offset?: number, errorCallback?: Function): this {
        this.addSyncTask(async () => {
            let offsetArg: number = offset === undefined ? 1 : offset;

            for (let i = 0; i < offsetArg; i++) {
                if (this.hasNext()) {
                    if (i + 1 === offset) {
                        await this.download(this.page.next, callback, errorCallback);
                    } else {
                        await this.download(this.page.next, undefined, errorCallback);
                    }
                } else {
                    throw Error(`Null next page link${offset !== undefined ? `, page: ${i}/${offsetArg}` : ''}`);
                }
            }
        });
        return this;
    }

    loadPrevious(callback?: Function, offset?: number, errorCallback?: Function): this {
        this.addSyncTask(async () => {
            let offsetArg: number = offset === undefined ? 1 : offset;

            for (let i = 0; i < offsetArg; i++) {
                if (this.hasNext()) {
                    if (i + 1 === offset) {
                        await this.download(this.page.previous, callback, errorCallback);
                    } else {
                        await this.download(this.page.previous, undefined, errorCallback);
                    }
                } else {
                    throw Error(`Null previous page link${offset !== undefined ? `, page: ${i}/${offsetArg}` : ''}`);
                }
            }
        });
        return this;
    }

    hasNext(): Boolean {
        return this.page.next !== null;
    }

    hasPrevious(): Boolean {
        return this.page.previous !== null;
    }

    get results(): T[] {
        return this.page.results;
    }

    private addSyncTask(callback: Function): void {
        this.tasks.push((async () => {
            const last = this.tasks.length - 1;
            await this.tasks[last];
            await callback();
        })());
    }

    private async download(url: string, callback: Function, errorCallback?: Function): Promise<void> {
        return this.retrieveData.fetch(url)
        .catch(reason => {if(errorCallback !== undefined) errorCallback(reason)})
        .then((data: DbPage<T>) => {
            if(data === undefined && this.onErrorContinue) {
                return;
            } else {
                this.page = data;
                callback();
            }
        });
    }
}