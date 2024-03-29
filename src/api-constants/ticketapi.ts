export default class ticketapi{
    public static prefix = "http://localhost:8081";

    public static ticketprefix = "/api/ticket";

    public static purchaseTicket = this.prefix + this.ticketprefix + "/add";

    public static ticketByUser = this.prefix + this.ticketprefix +  "/get/userId";
    
    public static ticketById = this.prefix + this.ticketprefix + "/get/id";

    public static allTickets = this.prefix + this.ticketprefix + "/get/all";

    public static ticketByMovie = this.prefix + this.ticketprefix + "/get/movietitle";

    public static ticketByPaymentId = this.prefix + this.ticketprefix + "/get/paymentid";

    public static updateTicketUser = this.prefix + this.ticketprefix + "/update/user";
    
    public static updateTicketScreening = this.prefix + this.ticketprefix + "/update/screening";

    public static deleteTicket = this.prefix + this.ticketprefix + "/delete";

}