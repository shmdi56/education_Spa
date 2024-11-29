import {Component, inject} from '@angular/core';
import {MatBadge} from "@angular/material/badge";
import {MatButton} from "@angular/material/button";
import {AuthService} from "../../../services/general-services/auth.service";

@Component({
  selector: 'app-header',
  imports: [
    MatBadge,
    MatButton
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
private authService = inject(AuthService);
  logout() {
    this.authService.logout();
  }
}
