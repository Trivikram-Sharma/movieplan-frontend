import { Search } from "./search";

export interface FilterSet{
    id?:number;
    title:string;
    language:string;
    amountMax:number;
    genre:string;
    showName:string;
    date:Date;
    city:string;
    state:string;
    searches?:Search[];
}