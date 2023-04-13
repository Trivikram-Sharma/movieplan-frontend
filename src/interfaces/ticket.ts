import { Movie } from "./movie";
import { Payment } from "./payment";
import { User } from "./user";

export interface Ticket {
    id:Number;
    user:User;
    movie:Movie;
    payment:Payment;
}
