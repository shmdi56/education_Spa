import {Component, inject, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {UserForLogin} from "../../models/user.model";
import {AuthService} from "../../services/general-services/auth.service";
import {Router} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    NgOptimizedImage,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  model: UserForLogin = { userName: '', password: '' };
  private authService = inject(AuthService)
  showPass = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toggleShowPass() {
    this.showPass = !this.showPass;
  }

  login() {
    this.authService.login(this.model);
  }

}
