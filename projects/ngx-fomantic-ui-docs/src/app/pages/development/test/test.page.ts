import {Component, ViewChild} from '@angular/core';
import {FuiToastContainer} from 'ngx-fomantic-ui';

@Component({
  standalone: false,
    selector: 'demo-page-test',
    templateUrl: './test.page.html'
})
export class TestPage {
  toastCounter = 0;

  @ViewChild('toastContainer')
  toastContainer: FuiToastContainer;

  addToast() {
    this.toastContainer.addToast({
      title: 'New notification',
      message: `Hello this is notification #${++this.toastCounter}`,
      class: 'warning',
      showProgress: 'top'
    });
  }

  addToast2() {
    this.toastContainer.addToast({
      title: 'New notification',
      message: `Hello this is notification #${++this.toastCounter}`,
      class: 'error',
      showProgress: 'bottom'
    });
  }
}
