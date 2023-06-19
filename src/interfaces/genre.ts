import { Movie } from "./movie";

export interface Genre {
    id?:Number;
    name:String;
    movies?: Movie[];
}
