import {Injectable} from '@angular/core';
import {BehaviorSubject, fromEvent} from "rxjs";
import {debounceTime,} from "rxjs/operators";

interface IViewportSizes {
    medium: number;
    large: number;
}

export interface IViewportServiceConfig {
    sizes: IViewportSizes,
    debounceMs?: number
}

export enum ViewportSize {
    medium = "medium",
    large = "large",
    small = "small",
}

const DEBOUNCE_MS_DEFAULT = 50;

@Injectable({
    providedIn: 'root'
})
export class ViewportService {
    private currentViewportSize: ViewportSize;
    viewportSizeChanges: BehaviorSubject<ViewportSize>;

    constructor(private config: IViewportServiceConfig) {
        this.currentViewportSize = this.getViewportSize();
        this.viewportSizeChanges = new BehaviorSubject(this.currentViewportSize);

        fromEvent<any>(window, "resize").pipe(
            debounceTime(this.getDebounceMs())
        ).subscribe(() => {
            const viewportSize = this.getViewportSize();
            if (viewportSize !== this.currentViewportSize) {
                this.currentViewportSize = viewportSize;
                this.viewportSizeChanges.next(viewportSize);
            }
        });
    }

    private getDebounceMs() {
        return 'debounceMs' in this.config ? this.config.debounceMs : DEBOUNCE_MS_DEFAULT;
    }

    private getViewportSize() {
        return this.getViewportSizeByWidth(this.getWidth());
    }

    private getViewportSizeByWidth(width) {
        if (width >= this.config.sizes.large) {
            return ViewportSize.large;
        } else if (width >= this.config.sizes.medium) {
            return ViewportSize.medium;
        } else {
            return ViewportSize.small;
        }
    }

    private getWidth() {
        return window.innerWidth;
    }

    /**
     * Check whether or not passed viewport size meets current
     * @param viewportSize
     */
    checkSize(viewportSize: ViewportSize): boolean {
        switch (viewportSize) {
            case ViewportSize.small:
                return true;
            case ViewportSize.medium:
                return [ViewportSize.medium, ViewportSize.large].includes(this.currentViewportSize);
            case ViewportSize.large:
                return [ViewportSize.large].includes(this.currentViewportSize);
            default:
                throw new Error(`Unknown viewport size was passed: ${viewportSize}`);
        }
    }
}
