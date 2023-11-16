import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FuiDimmerModule} from '../dimmer/internal';
import {FuiTransitionModule} from '../transition/internal';
import {FuiUtilityModule} from '../../misc/util/internal';
import {FuiModalService} from './services/modal.service';
import {FuiModal} from './components/modal';
import {FuiModalDimmer} from './components/dimmer';

@NgModule({
    imports: [
        CommonModule,
        FuiDimmerModule,
        FuiTransitionModule,
        FuiUtilityModule
    ],
    declarations: [
        FuiModal,
        FuiModalDimmer
    ],
    exports: [
        FuiModal
    ],
    providers: [
        FuiModalService
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ]
})
export class FuiModalModule {
}
