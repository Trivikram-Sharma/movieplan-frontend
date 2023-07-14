import { Screening } from "./screening";
import { Address } from "./address";
export interface Theatre {
    id?:Number;
    name:String;
    screens:Number;
    address:Address;
    screenings?:Screening[];
}
