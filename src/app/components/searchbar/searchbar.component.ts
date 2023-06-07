import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  /* PROPERTIES */
  sort:string = "ASC";
  //Filter Map
  filterMap:Map<string, string[]> = new Map([
    ["Address",["city","state","country","pincode"]],
    ["Movie",["price","language","releaseDate","status","genre","amountMin", "amountMax"]],
    ["Theatre",["name","screens"]],
    ["Genre",["name"]],
    ["ShowTime",["showName","starttime","endtime"]]
  ]);
  //filterShow
  filterShow:boolean = false;
  //filterList
  // filterList: String[] | undefined = [];
  //sortFiledMap
  sortFiledMap:Map<string, string[]> = new Map([
    ["Address",["city","state","country","pincode"]],
    ["Movie",["price","language","releaseDate", "title"]],
    ["Theatre",["name","screens"]],
    ["Genre",["name"]],
    ["ShowTime",["showName","starttime","endtime"]]
  ]);
  //sortFieldList
  //sortFieldList:String[]|undefined = [];
  

  //searchForm
  searchForm = new FormGroup({
    searchEntity: new FormControl('', Validators.required),
    searchBox: new FormControl('', Validators.required),
    sortBy: new FormControl('')
  }
  );

  //filterForm
  filterForm = new FormGroup({
  });

  //filterStore
  filterStore:Map<string,string|unknown> = new Map();

  //sortStore
  sortStore:Map<string|undefined,string|unknown> = new Map();

  /**Getters**/
  get filterControls(){
    return Object.keys(this.filterForm.controls);
  }
  get filterList(){
    let entity = this.searchForm.get('searchEntity')?.value;
    let result: string[] | undefined = [];
    switch(entity){
      case "ADDRESS":{
        result = this.filterMap.get("Address");
        break;
      }
      case "MOVIE":{
        result = this.filterMap.get("Movie");
        break;
      }
      case "THEATRE": {
        result = this.filterMap.get("Theatre");
        break;
      }
      case "GENRE" : {
        result = this.filterMap.get("Genre");
        break;
      }
      case "SHOWTIME" : {
        result = this.filterMap.get("Showtime");
        break;
      }
      default: {
        result = this.filterMap.get("Movie");
        break;
      }
    }
    return result;
  }
  get sortFieldList(){
    let entity = this.searchForm.get('searchEntity')?.value;
    let result:string[]|undefined = [];
    switch(entity){
      case "ADDRESS":{result = this.sortFiledMap.get('Address');break;}
      case "MOVIE":{result = this.sortFiledMap.get('Movie');break;}
      case "THEATRE":{result = this.sortFiledMap.get('Theatre');break;}
      case "GENRE":{result = this.sortFiledMap.get('Genre');break;}
      case "SHOWTIME":{result = this.sortFiledMap.get('Showtime');break;}
      default:{result = this.sortFiledMap.get('Movie');break;}
    }
    return result;
  }
  changeEntity(){
    let entity = this.searchForm.get('searchEntity')?.value;
    if(this.filterShow){
    this.showFilters(entity);}
  }

  showFilters(entity:string|null|undefined){
    if((entity!=null && entity!=undefined) && !this.filterShow){
    console.log(this.filterForm.get('filters'));
    this.filterForm.controls = {};
    this.filterList?.map(
      x => (<FormGroup>this.filterForm).addControl(x, new FormControl(''))
    );
    this.filterShow = true;
    }
    else {
      this.filterShow = false;
    }
    
    console.log(this.filterForm);

  }

  applyFilters(){
    let filters = this.filterForm.value;
    for(const f of Object.entries(filters)){
      this.filterStore.set(f[0],f[1]);
    }
    //Logic to filter the existing results
    this.filterShow = false;
  }
  setSortField(){
    let sortField = this.sortFieldList?.filter(
      x => x == this.searchForm.get('sortBy')?.value
    )[0];

    this.sortStore.set(sortField, this.sort);
  }
  toggle(){
    if(this.sort=="ASC"){

      this.sort = "DESC";
      return;
    }
    if(this.sort == "DESC"){
      this.sort = "ASC";
      return;
    }
  }
  submit(){

  }
}
