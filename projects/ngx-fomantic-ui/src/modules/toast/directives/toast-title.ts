import {Directive, TemplateRef} from '@angular/core';

@Directive({
  standalone: false,
  selector: 'ng-template[fuiToastTitle]'
})
export class FuiToastTitle {
  constructor(public templateRef: TemplateRef<any>) {
  }
}
