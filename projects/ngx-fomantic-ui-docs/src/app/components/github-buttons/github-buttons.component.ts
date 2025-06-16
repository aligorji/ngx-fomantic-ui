import { Component, Input } from '@angular/core';

@Component({
    standalone: false,
    selector: 'demo-github-buttons',
    templateUrl: './github-buttons.component.html'
})
export class GithubButtonsComponent {
    @Input()
    public mega = true;
}
