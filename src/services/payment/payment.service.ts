import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Payment } from 'src/interfaces/payment';
import paymentapi from 'src/api-constants/paymentapi';
import { User } from 'src/interfaces/user';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient: HttpClient) { }

  currentPayment:any;
  currentAmount:number = 0;

  setCurrentPayment(p:Payment){
    this.currentPayment = p;
  }
  getCurrentPayment(){
    return this.currentPayment;
  }

  setCurrentAmount(amount:number){
    this.currentAmount = amount;
  }
  getCurrentAmount(){
    return this.currentAmount;
  }

  //GET APIs
  getPaymentWithId(id:string){
    return this.httpClient.get<Payment>(paymentapi.getPaymentWithId+`?paymentId=${id}`);
  }
  getPaymentWithUserId(userId:string){
    return this.httpClient.get<Payment[]>(paymentapi.getPaymentWithUserId+`?userId=${userId}`);
  }

  //PUT APIs

  addPayment(p:Payment){
    return this.httpClient.put<Payment>(paymentapi.addPayment,p);
  }

  //PATCH APIs
  updatePaymentUser(p:Payment,u:User){
    return this.httpClient.patch<boolean>(paymentapi.updatePaymentUser+`/${p.id}?userId=${u.userName}`,u.userName);
  }

  //DELETE APIs
  deletePayment(p:Payment){
    return this.httpClient.delete<boolean>(paymentapi.deletePayment+`?paymentId=${p.id}`);
  }
}
