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
  sort:string = "ASC";
  //Filter Map
  filterMap:Map<String, String[]> = new Map([
    ["Address",["city","state","country","pincode"]],
    ["Movie",["price","language","releaseDate","status","genre","amount"]],
    ["Theatre",["name","screens"]],
    ["Genre",["name"]],
    ["ShowTime",["showName","starttime","endtime"]]
  ]);
  //filterShow
  filterShow:boolean = false;


  //searchForm
  searchForm = new FormGroup({
    searchEntity: new FormControl('', Validators.required),
    searchBox: new FormControl('', Validators.required)
  }
  );

  //filterForm
  filterForm = new FormGroup({
    filters: new FormArray([])
  });

  changeEntity(){

  }

  showFilters(){
    //console.log(this.filterForm.get('filters')?.value);
    let entity = this.searchForm.get('searchEntity')?.value;
    let filterList;
    if(entity == "ADDRESS"){
      filterList = this.filterMap.get("Address");
      if(filterList!=null){
      for(let filter of filterList){
        (<FormArray>this.filterForm.get('filters')).push(new FormArray([
          new FormControl(filter), new FormControl('')
        ]));
          // (<FormArray>this.filterForm.get('filters')).push();
          // (<FormArray>this.filterForm.get('filters')).push();
        }
        this.filterShow = true;
      }
      else {

      }

    }
  }

  applyFilters(){

  }
  toggle(){
    console.log(this.searchForm)
  }
  submit(){

  }
}
