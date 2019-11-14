import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IfViewportSizeDirective} from './if-viewport-size.directive';
import {ViewportService, IViewportServiceConfig} from './viewport.service';

@NgModule({
    declarations: [IfViewportSizeDirective],
    exports: [IfViewportSizeDirective],
    imports: [
        CommonModule
    ]
})
export class ViewportModule {
    static forRoot(config: IViewportServiceConfig): ModuleWithProviders {
        return {
            ngModule: ViewportModule,
            providers: [
                {provide: ViewportService, useFactory: () => new ViewportService(config)}
            ]
        }
    }
}
