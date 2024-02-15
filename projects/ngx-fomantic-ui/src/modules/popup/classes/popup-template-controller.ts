import { ElementRef, Renderer2, TemplateRef, Directive } from '@angular/core';
import { IPopup, FuiPopupController } from './popup-controller';
import { IImplicitContext, FuiComponentFactory } from '../../../misc/util/internal';
import { IPopupConfig, PopupConfig } from './popup-config';

const templateRef = TemplateRef;

export interface ITemplatePopupContext<T> extends IImplicitContext<IPopup> {
    context?: T;
}

export interface ITemplatePopupConfig<T> extends IPopupConfig {
    template?: TemplateRef<ITemplatePopupContext<T>>;
    context?: T;
}

export class TemplatePopupConfig<T> extends PopupConfig {
    public template?: TemplateRef<ITemplatePopupContext<T>>;
    public context?: T;
}

@Directive()
export class FuiPopupTemplateController<T> extends FuiPopupController {
    public template?: TemplateRef<ITemplatePopupContext<T>>;
    public context?: T;

    constructor(renderer: Renderer2,
        element: ElementRef,
        componentFactory: FuiComponentFactory,
        config: PopupConfig) {

        super(renderer, element, componentFactory, config);
    }

    public configure(config?: ITemplatePopupConfig<T>): void {
        super.configure(config);

        if (config) {
            this.template = config.template;
            this.context = config.context;
        }
    }

    public open(): void {
        if (!this.popup.config.enable) {
            return;
        }

        // If there is a template, inject it into the view.
        if (this.template) {
            this.popup.templateSibling.clear();

            this._componentFactory.createView(this.popup.templateSibling, this.template, {
                $implicit: this.popup,
                context: this.context
            });
        }

        super.open();
    }
}
