import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardBookService implements CanActivate {

  public flagFormFill: boolean = false;

  constructor(public router: Router) { }

  canActivate(): boolean {
    if (!this.flagFormFill) {
      this.router.navigate(["/book"]);
      return false;
    }
    return true;
  }

}
