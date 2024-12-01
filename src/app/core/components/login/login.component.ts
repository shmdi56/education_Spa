import {Component, inject, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {UserForLogin} from "../../models/user.model";
import {AuthService} from "../../services/general-services/auth.service";
import {NgIf} from "@angular/common";
import {MatPrefix} from "@angular/material/form-field";
import {MatTooltip} from "@angular/material/tooltip";
import {MatProgressBar} from "@angular/material/progress-bar";

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    NgIf,
    MatPrefix,
    MatTooltip,
    MatProgressBar,
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  model: UserForLogin = { userName: '', password: '' };
  public authService = inject(AuthService)
  showPass = false;
  userName = '';
  passWord = '';

  constructor() { }

  ngOnInit(): void {
  }

  toggleShowPass() {
    this.showPass = !this.showPass;
  }

  login() {
    this.model.userName = this.userName;
    this.model.password = this.passWord;
    this.authService.login(this.model);
  }

}
