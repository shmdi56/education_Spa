import {NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';
import {PreloadModulesStrategy} from "./strategies/preload-modules.strategy";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {httpRequestInterceptor} from "./interceprots/http-request.interceptor";
import {EnsureModuleLoadedOnceGuard} from "./quards/ensure-module-loaded-once.guard";
import {FormsModule} from "@angular/forms";
import {MatTooltip} from "@angular/material/tooltip";
import {MatPrefix} from "@angular/material/form-field";
import {ToastrModule} from "ngx-toastr";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    MatTooltip,
    MatPrefix,
    ToastrModule
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
