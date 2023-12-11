import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
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
  activeRoute: string = '';

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.activeRoute = this.route.snapshot.firstChild?.routeConfig?.path || '';
      });
  }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  logoutUser(): void {
    this.authService.logoutUser();
  }

  getUsername(): string {
    return this.authService.getUserName() || '';
  }

  isActive(route: string): boolean {
    return this.router.isActive(route, true);
  }
}
