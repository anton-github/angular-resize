import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ViewportModule} from "../viewport/viewport.module";
import {AppComponent} from './app.component';
import {HelloComponent} from './hello.component';
import {TestComponent} from './test.component';

@NgModule({
    imports: [BrowserModule, ViewportModule.forRoot({sizes: {medium: 769, large: 1025}, debounceMs: 150})],
    declarations: [AppComponent, HelloComponent, TestComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
