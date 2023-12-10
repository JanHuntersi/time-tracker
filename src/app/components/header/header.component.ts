import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  showMenu: boolean = false;

  constructor(private authService: AuthService) { }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  logout(): void {
    console.log("clicked logout")
    this.authService.logout();
  }

  getUsername(): string {
    const user = this.authService.getUser();
    if (user) {
      return user.username;
    }
    return '';
  }
}
