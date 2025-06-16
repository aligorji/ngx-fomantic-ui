import {Directive, TemplateRef} from '@angular/core';

@Directive({
  standalone: false,
  selector: 'ng-template[fuiToastMessage]'
})
export class FuiToastMessage {
  constructor(public templateRef: TemplateRef<any>) {
  }
}
