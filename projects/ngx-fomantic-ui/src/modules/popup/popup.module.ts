import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FuiTransitionModule} from '../transition/internal';
import {FuiUtilityModule} from '../../misc/util/internal';
import {FuiPopupDirective} from './directives/popup.directive';
import {FuiPopupArrow} from './components/popup-arrow';
import {FuiPopup} from './components/popup';
import {FuiPopupConfig} from './services/popup.service';

@NgModule({
    imports: [
        CommonModule,
        FuiTransitionModule,
        FuiUtilityModule
    ],
    declarations: [
        FuiPopupDirective,
        FuiPopupArrow,
        FuiPopup
    ],
    exports: [
        FuiPopupDirective,
        FuiPopup
    ],
    providers: [
        FuiPopupConfig
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ]
})

export class FuiPopupModule {
}
