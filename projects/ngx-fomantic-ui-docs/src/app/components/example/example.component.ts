import { Component, Input } from '@angular/core';

@Component({
    standalone: false,
    selector: 'demo-example',
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.css']
})
export class ExampleComponent {
    public detail = false;

    @Input()
    public code: string;
}
