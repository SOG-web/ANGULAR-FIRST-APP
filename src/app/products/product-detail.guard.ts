import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(next: ActivatedRouteSnapshot): any {
    const id = +next.url[1].path;
    if (isNaN(id) || id < 1 || id !== id) {
      alert('Invalid product id');
      this.router.navigate(['/products']);
      return false;
    }
    return true;
  }
}
