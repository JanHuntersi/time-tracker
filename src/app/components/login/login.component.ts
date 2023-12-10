import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = '';
  isUsernameValid: boolean = false;

  onUsernameChange(): void {
    this.isUsernameValid = this.username.trim().length > 0;
  }

  constructor(private authService: AuthService) { }

  login(): void {
    if (!this.isUsernameValid) {
      return;
    }
    this.authService.loginUser(this.username);
  }

}
