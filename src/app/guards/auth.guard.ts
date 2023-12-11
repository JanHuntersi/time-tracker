import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = new Router

  if (localStorage.getItem('user')) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
