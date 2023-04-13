import { Movie } from "./movie";
import { Showtime } from "./showtime";
import { Theatre } from "./theatre";

export interface Screening {
    id: Number;
    theatre : Theatre;
    movie : Movie;
    showTime: Showtime;
    date:Date;
    status:String;
}
