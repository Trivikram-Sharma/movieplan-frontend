export default class paymentapi{
    public static prefix = "http://localhost:8081";

    public static paymentprefix = "/api/payment";

    public static getPaymentWithId = this.prefix + this.paymentprefix + "/get/id";
    public static getPaymentWithUserId = this.prefix + this.paymentprefix + "/get/userId";
    public static addPayment = this.prefix + this.paymentprefix + "/add";
    public static updatePaymentUser = this.prefix + this.paymentprefix + "/update/user"; 
    public static deletePayment = this.prefix + this.paymentprefix + "/delete";
}