import { DbPage } from '../../models/db-page';
import { DbPageFetchService } from './db-page-fetch.service';
import { Directive } from '@angular/core';

@Directive(null)
export class DbPageIteratorDirective<T> {
    private page: DbPage<T>;
    private task: Promise<any>;

    constructor(private retrieveData: DbPageFetchService<T>,
                private onErrorContinue: boolean = false
    ) {
        const emptyTask = (async () => { })();
        this.task = emptyTask;
    }

    // load only one page on url
    init(url: string, { callback, errorCallback }: { callback?: CallableFunction; errorCallback?: CallableFunction; }): this {
        this.addSyncTask(async () => {
            await this.download({ url, callback, errorCallback });
        });
        return this;
    }

    // load all pages on source url
    loadAll({ url, callback, errorCallback }: { url: string; callback?: CallableFunction; errorCallback?: CallableFunction; }): this {
        this.addSyncTask(async () => {

            this.init(url, {callback: async () => {

                const start = this.page.results;

                this.page = {
                    count: 0,
                    next: null,
                    previous: null,
                    results: []
                };

                const prev = [];
                const next = [];

                while (await this.hasNext()) {
                    this.loadNext({ callback: () => next.push(...this.results), offset: 1, errorCallback });
                }

                this.init(url, {callback: errorCallback});
                while (await this.hasPrevious()) {
                    this.loadPrevious({ callback: () => prev.push(...this.results), offset: 1, errorCallback });
                }

                this.page.results = [...prev, ...start, ...next];
                this.page.count = this.page.results.length;
                console.log(`${prev}, ${start} ${next}`);
                await callback();

            }, errorCallback});
        });
        return this;
    }

    loadNext({ callback, offset, errorCallback }:
        { callback?: CallableFunction; offset?: number; errorCallback?: CallableFunction; } = {}): this {

        this.addSyncTask(async () => {
            const offsetArg: number = offset === undefined ? 1 : offset;

            for (let i = 0; i < offsetArg; i++) {
                if (await this.hasNext()) {
                    if (i + 1 === offset) {
                        await this.download({ url: this.page.next, callback, errorCallback });
                    } else {
                        await this.download({ url: this.page.next, callback: undefined, errorCallback });
                    }
                } else {
                    throw Error(`Null next page link${offset !== undefined ? `, page: ${i}/${offsetArg}` : ''}`);
                }
            }
        });
        return this;
    }

    loadPrevious({ callback, offset, errorCallback }:
        { callback?: CallableFunction; offset?: number; errorCallback?: CallableFunction; } = {}): this {

        this.addSyncTask(async () => {
            const offsetArg: number = offset === undefined ? 1 : offset;

            for (let i = 0; i < offsetArg; i++) {
                if (await this.hasNext()) {
                    if (i + 1 === offset) {
                        await this.download({ url: this.page.previous, callback, errorCallback });
                    } else {
                        await this.download({ url: this.page.previous, callback: undefined, errorCallback });
                    }
                } else {
                    throw Error(`Null previous page link${offset !== undefined ? `, page: ${i}/${offsetArg}` : ''}`);
                }
            }
        });
        return this;
    }

    hasNext(): Promise<boolean> {
        this.addSyncTask((async () => {
            return this.page.next !== null;
        }));
        return this.task as Promise<boolean>;
    }

    hasPrevious(): Promise<boolean> {
        this.addSyncTask((async () => {
            return this.page.previous !== null;
        }));
        return this.task as Promise<boolean>;
    }

    get results(): T[] {
        return this.page.results;
    }

    private addSyncTask(callback: any): void {
        this.task = this.task.then(async (data: any) => await callback(data));
    }

    private async download(
        { url, callback, errorCallback }: { url: string; callback?: any; errorCallback?: any; }): Promise<void> {
        return this.retrieveData.fetch(url)
            .catch(reason => { if (errorCallback !== undefined) { errorCallback(reason); } })
            .then((data: DbPage<T>) => {
                if (data === undefined && this.onErrorContinue) {
                    return;
                } else {
                    this.page = data;
                    if (callback !== undefined) {
                        callback();
                    }
                }
            });
    }
}
