import { isAuthenticated } from '@igorjacauna/lib-firebase';
import { Router } from 'vue-router';

export const configureAuthGuard = (router: Router) => {
  router.beforeResolve(async (to) => {
    const user = await isAuthenticated();
    if (to.meta.auth && !user) {
      return '/';
    }
    return true;
  });
};
