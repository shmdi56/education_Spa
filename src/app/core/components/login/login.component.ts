import {Component, inject, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {UserForLogin} from "../../models/user.model";
import {AuthService} from "../../services/general-services/auth.service";

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  model: UserForLogin = { userName: '', password: '' };
  private authService = inject(AuthService)
  showPass = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleShowPass() {
    this.showPass = !this.showPass;
  }

  login() {
    this.authService.login(this.model);
  }

}
