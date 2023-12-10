import { AuthService } from '../services/auth.service';
import { CanActivateFn, Router } from '@angular/router';

export const NotAuthGuard: CanActivateFn = (route, state) => {
  const router = new Router();
  const authService = new AuthService(router);

  if (!authService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }
};
