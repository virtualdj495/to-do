import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { ObjectivesService } from './objectives.service';

@Injectable({
  providedIn: 'root'
})
export class MyGuard implements CanActivate {

  constructor(
    private services: ObjectivesService,
    private router: Router
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
     
      return this.services.getState();
  }

  forbbidenAcces() {
    if (this.services.getState() === false) {
      this.router.navigateByUrl('/login');
    }
    return this.services.getState();
  }

}
@Injectable({
  providedIn: 'root'
})
export class Forbbiden implements CanActivate {

  constructor(
    private services: ObjectivesService,
    private router: Router
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
     
        if (this.services.getState() === false) {
          this.router.navigateByUrl('/login');
        }
        return this.services.getState();
  }

}