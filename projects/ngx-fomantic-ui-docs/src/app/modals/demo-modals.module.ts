import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuiModalModule } from 'ngx-fomantic-ui';
import { AlertModalComponent } from './alert.modal';
import { ConfirmModalComponent } from './confirm.modal';

@NgModule({
    imports: [
        CommonModule,
        FuiModalModule
    ],
    declarations: [
        AlertModalComponent,
        ConfirmModalComponent
    ],
    exports: [
        AlertModalComponent,
        ConfirmModalComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ]
})
export class DemoModalsModule {}
