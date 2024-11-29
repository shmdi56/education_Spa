import { Component } from '@angular/core';
import {MatBadge} from "@angular/material/badge";
import {MatButton} from "@angular/material/button";

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

}
