import { FilterSet } from "./filterset";

export interface Search{
    id?:number;
    userId:string;
    searchType:string;
    searchKeyword:string;
    filterSet?:FilterSet;
    sortField:string;
    sortOrder:string;
}
