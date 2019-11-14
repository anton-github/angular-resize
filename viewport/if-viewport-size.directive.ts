import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {ViewportService, ViewportSize} from "./viewport.service";

@Directive({
    selector: '[ifViewportSize]'
})
export class IfViewportSizeDirective implements OnInit {
    private size: ViewportSize;
    private isRendered: boolean = false;

    constructor(private viewContainerRef: ViewContainerRef,
                private templateRef: TemplateRef<any>,
                private viewportService: ViewportService) {
    }

    @Input()
    set ifViewportSize(size) {
        this.size = size;
        this.check();
    }

    ngOnInit(): void {
        this.viewportService.viewportSizeChanges.subscribe(this.onViewportSizeChanged);
    }

    private onViewportSizeChanged = () => {
        this.check();
    };

    private check() {
        const shouldBeRendered = this.viewportService.checkSize(this.size);
        if (!this.isRendered) {
            if (shouldBeRendered) {
                this.render();
                this.isRendered = true;
            }
        } else {
            if (!shouldBeRendered) {
                this.clear();
                this.isRendered = false;
            }
        }
    }

    private render() {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
    }

    private clear() {
        this.viewContainerRef.clear();
    }
}
