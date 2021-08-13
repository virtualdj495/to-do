import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ObjectivesService } from './objectives.service';

@Injectable({
  providedIn: 'root'
})
export class MyGuardGuard implements CanActivate {

  constructor(
    private services: ObjectivesService
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      return this.services.getState();
  }



}
