import { Component, HostBinding } from '@angular/core';

@Component({
    standalone: false,
    selector: 'demo-page-content',
    template: `
<ng-content></ng-content>
`,
    styleUrls: ['./page-content.component.css']
})
export class PageContentComponent {
    @HostBinding('class.ui')
    @HostBinding('class.main')
    @HostBinding('class.container')
    public classes = true;
}
