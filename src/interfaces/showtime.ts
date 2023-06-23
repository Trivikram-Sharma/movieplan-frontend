import { Time } from "@angular/common";
import { Screening } from "./screening";

export interface Showtime {
    id?:Number;
    showName:String;
    startTime:Time;
    endTime:Time;
    screenings?:Screening[];
}
