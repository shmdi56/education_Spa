import {Component, inject} from '@angular/core';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {HeaderComponent} from "./core/shell/layout/header/header.component";
import {RouterOutlet} from "@angular/router";
import {FooterComponent} from "./core/shell/layout/footer/footer.component";
import {AuthService} from "./core/services/general-services/auth.service";
import {LoginComponent} from "./core/components/login/login.component";

@Component({
    selector: 'app-root',
  imports: [MatSlideToggleModule, HeaderComponent, RouterOutlet, FooterComponent, LoginComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  protected authService = inject(AuthService);
  title = 'education';
}
