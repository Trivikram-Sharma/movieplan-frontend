import { Movie } from "./movie";
import { Showtime } from "./showtime";
import { Theatre } from "./theatre";
import { Ticket } from "./ticket";

export interface Screening {
    id?: Number;
    theatre : Theatre;
    movie : Movie;
    showTime: Showtime;
    date:Date;
    status?:String;
    tickets?:Ticket[];
}
