import { Genre } from "./genre";
import { Screening } from "./screening";
export interface Movie {
    id:String;
    title:String;
    price:Number;
    language:String;
    description:String;
    releaseDate:Date;
    status:String;
    fileName:String;
    genres: Genre[];
    screenings: Screening[];
}
