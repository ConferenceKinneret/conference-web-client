import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * @author Amjad Tarif
 */
export class LoginAuthGuard implements CanActivate {
  constructor(private route: Router){}

  /**
   * check if the user is login in
   * allow to access the pages just if the user logined in
   */
  canActivate(): boolean | Observable<boolean> {
    const token = localStorage.getItem('token');
    if(token){
      return true;
    } // end if
    this.route.navigate(['/']);
    return false;

  } // end canActivate()  
}
