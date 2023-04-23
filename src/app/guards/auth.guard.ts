import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../servicios/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private serStorage: StorageService, private router: Router){ }

  canActivate(): boolean {
    const user = this.serStorage.get('user');
    if(user){
      this.router.navigateByUrl('/tabs');
      return false;
    } else{
      return true;
    }
  }
}
