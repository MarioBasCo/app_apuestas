import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../servicios/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AutologinGuard implements CanActivate {
  constructor(private serStorage: StorageService, private router: Router){

  }

  canActivate(): boolean {
    const user = this.serStorage.get('user');
    if(user){
      return true;
    } else{
      this.router.navigateByUrl('/auth');
      return false;
    }
  }
}
