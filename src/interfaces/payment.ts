import { Ticket } from "./ticket";
import { User } from "./user";

export interface Payment {
    id?: Number;
    user: User;
    tickets: Ticket[];
}
