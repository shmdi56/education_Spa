import {NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';
import {PreloadModulesStrategy} from "./strategies/preload-modules.strategy";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {httpRequestInterceptor} from "./interceprots/http-request.interceptor";
import {EnsureModuleLoadedOnceGuard} from "./quards/ensure-module-loaded-once.guard";



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    PreloadModulesStrategy,
    { provide: HTTP_INTERCEPTORS, useClass: httpRequestInterceptor, multi: true }
  ],
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  // Looks for the module in the parent injector to see if it's already been loaded (only want it loaded once)
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
