import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Resolve, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Address } from 'src/interfaces/address';
import { AddressService } from 'src/services/address/address.service';

@Injectable({
  providedIn: 'root'
})
export class AddressResolverGuard implements Resolve<Observable<Address[]>> {
  constructor(private addressService:AddressService){}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<Address[]> {
    return this.addressService.getAllAddresses();
  }
  
}
