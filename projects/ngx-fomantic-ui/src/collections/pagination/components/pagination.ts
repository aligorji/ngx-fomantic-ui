import { Component, EventEmitter, HostBinding, Input, OnChanges, Output } from '@angular/core';

@Component({
    standalone: false,
    selector: 'fui-pagination',
    template: `
<a *ngIf="hasBoundaryLinks" class="item"  (click)="setPage(1)" [class.disabled]="page===1">
<span><i class="angle double {{isRtl ? 'left' : 'right'}} icon"></i></span>
</a>
<a *ngIf="hasNavigationLinks" class="item" (click)="setPage(page-1)" [class.disabled]="!hasPrevious()">
<span><i class="angle {{isRtl ? 'right' : 'left'}} icon"></i></span>
</a>
<ng-container *ngIf="hasEllipses">
    <a class="item" (click)="setPage(1)" *ngIf="pages[0] !== 1">
        <span>1</span>
    </a>
    <a class="disabled item" *ngIf="pages[0] > 2">...</a>
</ng-container>
<a *ngFor="let p of pages" class="item" [class.active]="p===page" (click)="setPage(p)">
    {{ p }}
</a>
<ng-container *ngIf="hasEllipses">
    <a class="disabled item" *ngIf="pages[pages.length - 1] < pageCount - 1">...</a>
    <a class="item" (click)="setPage(pageCount)" *ngIf="pages[pages.length - 1] !== pageCount">
        <span>{{ pageCount }}</span>
    </a>
</ng-container>
<a *ngIf="hasNavigationLinks" class="item" (click)="setPage(page+1)" [class.disabled]="!hasNext()">
<span><i class="angle {{isRtl ? 'left' : 'right'}} icon"></i></span>
</a>
<a *ngIf="hasBoundaryLinks" class="item"  (click)="setPage(pageCount)" [class.disabled]="page===pageCount">
<span><i class="angle double {{isRtl ? 'left' : 'right'}} icon"></i></span>
</a>
`,
    styles: [`
:host .item {
    transition: none;
}
`]
})
export class FuiPagination implements OnChanges {

    @HostBinding('class.ui')
    @HostBinding('class.pagination')
    @HostBinding('class.menu')
    public readonly hasClasses: boolean;
    // Public members
    public pageCount: number;
    @Output()
    public pageChange: EventEmitter<number>;
    @Input()
    public pageSize: number;
    @Input()
    public hasBoundaryLinks: boolean;
    @Input()
    public canRotate: boolean;
    @Input()
    public hasEllipses: boolean;
    @Input()
    public isRtl: boolean = false;

    constructor() {
        this.hasClasses = true;
        this.pageChange = new EventEmitter<number>();

        this.pageSize = 10;
        this._page = 1;
        this._pages = [];
        this.pageCount = 1;
        this.hasNavigationLinks = true;
        this.hasBoundaryLinks = false;
        this.canRotate = false;
        this.hasEllipses = true;
    }

    // Private members
    private _maxSize?: number;

    @Input()
    public get maxSize(): number | undefined {
        return this._maxSize;
    }

    public set maxSize(value: number | undefined) {
        this._maxSize = (value != undefined) ? Math.max(value, 1) : undefined;
    }

    private _collectionSize: number;

    @Input()
    public get collectionSize(): number {
        return this._collectionSize;
    }

    public set collectionSize(value: number) {
        this._collectionSize = Math.max(value, 0);
        this.pageCount = Math.max(1, Math.ceil(this._collectionSize / this.pageSize));
    }

    private _page: number;

    @Input()
    public get page(): number {
        return this._page;
    }

    public set page(value: number) {
        this.setPage(value);
    }

    private _pages: number[];

    public get pages(): number[] {
        return this._pages;
    }

    private _hasNavigationLinks: boolean;

    @Input()
    public get hasNavigationLinks(): boolean {
        const maxSize = this._maxSize || this.pageCount;
        return this._hasNavigationLinks || maxSize < this.pageCount;
    }

    public set hasNavigationLinks(value: boolean) {
        this._hasNavigationLinks = value;
    }

    // Public methods
    public hasPrevious(): boolean {
        return this.page > 1;
    }

    public hasNext(): boolean {
        return this.page < this.pageCount;
    }

    public setPage(newPage: number): void {
        const value: number = (Number.isInteger(newPage)) ? Math.min(Math.max(newPage, 1), this.pageCount) : 1;
        if (value !== this._page) {
            this._page = value;
            this.pageChange.emit(this._page);
        }
    }

    // Lifecycle hooks
    public ngOnChanges(): void {
        this.updatePages();
    }

    // Private methods
    private updatePages(): void {
        this.pageCount = Math.max(1, Math.ceil(this._collectionSize / this.pageSize));

        const [start, end] = this.applyPagination();

        this._pages = Array<number>(end - start)
            .fill(start + 1)
            .map((s, i) => s + i);
    }

    private applyPagination(): [number, number] {
        const maxSize = (this.maxSize != undefined) ? Math.min(this.maxSize, this.pageCount) : this.pageCount;

        const page = Math.ceil(this.page / maxSize) - 1;
        let start = 0;
        let end = this.pageCount;

        if (this.canRotate) {
            const leftOffset = Math.floor(maxSize / 2);
            const rightOffset = maxSize % 2 === 0 ? leftOffset - 1 : leftOffset;

            if (this.page <= leftOffset) {
                end = maxSize;
            } else if (this.pageCount - this.page < leftOffset) {
                start = this.pageCount - maxSize;
            } else {
                start = this.page - leftOffset - 1;
                end = this.page + rightOffset;
            }
        } else {
            start = page * maxSize;
            end = start + maxSize;
        }

        return [start, Math.min(end, this.pageCount)];
    }
}
