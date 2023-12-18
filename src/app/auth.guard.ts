import { CanActivateFn, Router } from '@angular/router';
import { APIKEY } from './constants/constant';

export const authGuard: CanActivateFn = (route, state) => {
  if(localStorage.getItem(APIKEY)){
    return true;
  }
  return false;
};
