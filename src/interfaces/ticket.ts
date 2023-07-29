import { Movie } from "./movie";
import { Payment } from "./payment";
import { User } from "./user";
import { Screening } from "./screening";

export interface Ticket {
    id?:Number;
    user:User;
    screening:Screening;
    payment?:Payment;
}
