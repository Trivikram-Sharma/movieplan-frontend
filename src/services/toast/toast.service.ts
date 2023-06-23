import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  message:any="";
  show:string="";

  setMessage(val:string){
    this.message = val;
  }

  setShow(val:string){
    this.show = val;
  }

  getMessage(){
    return this.message;
  }

  getShow(){
    return this.show;
  }





}
