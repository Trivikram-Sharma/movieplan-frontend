import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import filtersetapi from 'src/api-constants/filtersetapi';
import searchapi from 'src/api-constants/searchapi';
import { FilterSet } from 'src/interfaces/filterset';
import { Search } from 'src/interfaces/search';
import { User } from 'src/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private httpClient:HttpClient) { }
  searchKeyword:string = "";
  searchField:string = "";
  filterStore:Map<string,string> = new Map();
  sortStore:string = "";
  sortOrder:string = "ASC";

  currentSearch:any;
  currentFilterSet:any;
  /****GETTERS AND SETTERS *******/
    //searchField
  getSearchField(){
    return this.searchField;
  }
  setSearchField(sfield:string){
    this.searchField = sfield;
  }
    //search Keyword
  getSearchKeyword(){
    return this.searchKeyword;
  }
  setSearchKeyword(skword:string){
    this.searchKeyword = skword;
  }
    //filter store
  setFilterStore(fs:Map<string,string>){
    this.filterStore = fs;
  }
  getFilterStore(){
    return this.filterStore;
  }
    //sort store
  setSortStore(ss:string){
    this.sortStore = ss;
  }
  getSortStore(){
    return this.sortStore;
  }
    //sort order
  getSortOrder(){
    return this.sortOrder;
  }
  setSortOrder(so:string){
    this.sortOrder = so;
  }

  //Search
  getCurrentSearch(){
    return this.currentSearch;
  }
  setCurrentSearch(s:Search){
    this.currentSearch = s;
  }
  //FilterSet
  getCurrentFilterSet(){
    return this.currentFilterSet;
  }
  setCurrentFilterSet(fs:FilterSet){
    this.currentFilterSet = fs;
  }

  //API METHODS

  //POST APIs
  addSearch(s:Search){
    return this.httpClient.post<boolean>(searchapi.addSearch,s);
  }

  getParticularSearch(s:Search){
    return this.httpClient.post<Search[]>(searchapi.getParticularSearch,s);
  }

  //GET APIs

  getAllSearches(){
    return this.httpClient.get<Search[]>(searchapi.getAllSearches);
  }

  getAllFilterSets(){
    return this.httpClient.get<FilterSet[]>(filtersetapi.getAllFilterSets);
  }

  getAllSearchesByUser(user:User){
    return this.httpClient.get<Search[]>(searchapi.getAllSearchesByUser+`?userId=${user.userName}`);
  }

  //PATCH APIs
  updateSearch(id:number,s:Search){
    return this.httpClient.patch<boolean>(searchapi.updateSearch+`/${id}`,s);
  }

  //DELETE APIs
  deleteSearch(s:Search){
    return this.httpClient.delete<boolean>(searchapi.deleteSearch+`?searchId=${s.id}`);
  }
}
