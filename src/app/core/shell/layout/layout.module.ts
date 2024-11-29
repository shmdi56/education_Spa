import {NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {EnsureModuleLoadedOnceGuard} from "../../quards/ensure-module-loaded-once.guard";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent
  ],
  exports: [HeaderComponent, FooterComponent]
})
export class LayoutModule extends EnsureModuleLoadedOnceGuard {
  constructor(@Optional() @SkipSelf() parentModule: LayoutModule) {
    super(parentModule);
  }
}
