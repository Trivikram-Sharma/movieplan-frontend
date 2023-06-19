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
    filename:String;
    genres: Genre[];
    screenings: Screening[];
}
