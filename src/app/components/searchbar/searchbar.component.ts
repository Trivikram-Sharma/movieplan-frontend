import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/services/cart/cart.service';
import { LoginService } from 'src/services/login/login.service';
import { SearchService } from 'src/services/search/search.service';
import { Screening } from 'src/interfaces/screening';
import { Ticket } from 'src/interfaces/ticket';
import { Search } from 'src/interfaces/search';
import { FilterSet } from 'src/interfaces/filterset';
@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {
  screeningList: Screening[] = [];
  userTickets: Ticket[] = [];
  resultScreenings:Screening[] = [];
  userSearches: Search[] = [];
  filterSets:FilterSet[] = [];
  constructor(private searchService: SearchService,
    private loginService:LoginService,
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    console.log('Search Bar component initialized')
    this.activatedRoute.data.forEach(
      data => {
        console.log(data);
        this.screeningList = data['data']['screenings'];
        this.userTickets = data['data']['userTickets'];
        this.userSearches = <Search[]>data['data']['userSearches'];
        this.filterSets = data['data']['filterSets']
      }
    );
    console.log('userSearches->',this.userSearches);
    console.log('filterSets->',this.filterSets);
  }

  /* PROPERTIES */
  sort:string = "ASC";
  
  //filterShow
  filterShow:boolean = false;
  
  //Placeholder Text
  placeholderText:string = "";
  //searchForm
  searchForm = new FormGroup({
    searchEntity: new FormControl('', Validators.required),
    searchBox: new FormControl('', Validators.required),
    sortBy: new FormControl('')
  }
  );

  //filterForm
  filterForm = new FormGroup({
    title: new FormControl(''),
    language: new FormControl(''),
    amountMax: new FormControl(0.0),
    genre: new FormControl(''),
    showName: new FormControl(''),
    date: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl('')
  });

  //filterStore
  filterStore:Map<string,string|number> = new Map();

  //sortStore
  sortStore:string = "";

  /**Getters**/
  get filterControls(){
    return Object.keys(this.filterForm.controls);
  }

  getResultScreenings(){
    return this.resultScreenings;
  }
  get filterList(){
    //let entity = this.searchForm.get('searchEntity')?.value;
    let result: string[] | undefined = ["title","language","amountMax","genre","showName","date","city","state"];
    
    return result;
  }
  get sortFieldList(){
    // let entity = this.searchForm.get('searchEntity')?.value;
    let result:string[]|undefined = ["title","language","amountMax","genre","showName","date","city","state"];
    
    return result;
  }
  /*   SETTERS     */
  setResultScreenings(rs:Screening[]){
    this.resultScreenings = rs;
  }



  //Event handler on changing the search entity/search type
  changeEntity(){
    let entity = this.searchForm.get('searchEntity')?.value;
    switch(entity){
      case "title": {
        this.placeholderText = "Enter the movie Title";
        break;
      }
      case "language":{
        this.placeholderText = "Enter the Language of the movie.";
        break;
      }
      case "genre": {
        this.placeholderText = "Enter the genre of the movie";
        break;
      }
      case "city": {
        this.placeholderText = "Enter the city of the theatre, where you watch the movie.";
        break;
      }
      case "state": {
        this.placeholderText = "Enter the state where the theatre is located.";
        break;  
      }
    }
    if(this.filterShow){
    this.showFilters(entity);}
  }

  //Event handler to reveal filters on clicking Filters
  showFilters(entity:string|null|undefined){
    if((entity!=null && entity!=undefined) && !this.filterShow){
      console.log(this.filterForm.get('filters'));
      
      let filterList = ["title","language","amountMax","genre","showName","date","city","state"];
      
      this.filterShow = true;
    }
    else {
      this.filterShow = false;
    }
    
    console.log(this.filterForm);

  }

  //Event handler on clicking Apply Filters
  applyFilters(){
    let filters = this.filterForm.value;
    /*for(const f of Object.entries(filters)){
      this.filterStore.set(f[0],<string>f[1]);
    }*/
    this.filterStore.set('title',<string>this.filterForm.get('title')?.value);
    this.filterStore.set('language',<string>this.filterForm.get('language')?.value);
    this.filterStore.set('amountMax',<number>this.filterForm.get('amountMax')?.value);
    this.filterStore.set('genre',<string>this.filterForm.get('genre')?.value);
    this.filterStore.set('showName',<string>this.filterForm.get('showName')?.value);
    this.filterStore.set('date',<string>this.filterForm.get('date')?.value);
    this.filterStore.set('city',<string>this.filterForm.get('city')?.value);
    this.filterStore.set('state',<string>this.filterForm.get('state')?.value);
    console.log('filterStore.amountMax->',this.filterStore.get('amountMax'));
    //Logic to filter the existing results
    // this.searchService.setFilterStore(this.filterStore);
    this.filterShow = false;

    //If filters are non-empty, filter the results based on the filter values
    if(this.screeningList.length!=0 && this.filterStore.size!=0){
      //Checking whether such filterSet already present, with the values given in the filterForm
      let filterSetResults = this.filterSets.filter(
        fs => fs.title == this.filterStore.get('title')
        && fs.language == this.filterStore.get('language')
        && (fs.amountMax==0 ?(this.filterStore.get('amountMax')==null 
        || this.filterStore.get('amountMax')==0)
        : fs.amountMax == this.filterStore.get('amountMax'))
        && fs.city == this.filterStore.get('city')
        && fs.date.toString() == this.filterStore.get('date')
        && fs.genre == this.filterStore.get('genre')
        && fs.showName == this.filterStore.get('showName')
        && fs.state == this.filterStore.get('state')
      );
      console.log('filterStore->',this.filterStore);
      console.log('filterSets->',this.filterSets);
      console.log('filterSetResults->',filterSetResults);
      //If one such filterset is found, set it as current filterSet and proceed
      if(filterSetResults.length==1){
        this.searchService.setCurrentFilterSet(filterSetResults[0]);
        let cs:Search = this.searchService.getCurrentSearch();
        this.finalizeSearchWithFilterSet(filterSetResults[0],this.loginService.currentUser.userName,
          cs.searchType,cs.searchKeyword,
          cs.sortField,cs.sortOrder);
      }
      //If multiple filterset results found with the provided values, unknown error
      else if(filterSetResults.length > 1){
        alert(`Multiple FilterSet Results FOUND WITH SAME VALUES!! Unknown error!!`);
      }
      else {
        //FilterSet Going to be used
        let fset:FilterSet = {
          title: <string>this.filterStore.get('title'),
          language: <string>this.filterStore.get('language'),
          amountMax: parseInt(<string>this.filterStore.get('amountMax')),
          genre: <string>this.filterStore.get('genre'),
          showName:<string>this.filterStore.get('showName'),
          date: new Date(<string>this.filterStore.get('date')),
          city: <string>this.filterStore.get('city'),
          state: <string>this.filterStore.get('state')
        };
        let cs:Search = this.searchService.getCurrentSearch();
        console.log('Current Search??!!->',cs);
        this.finalizeSearchWithFilterSet(fset,this.loginService.currentUser.userName,cs.searchType,cs.searchKeyword,
          cs.sortField,cs.sortOrder);
      }
      
      // this.setResultScreenings(this.getScreeningsWithFilters(this.screeningList,this.filterStore));
    }
    // this.router.navigate(['/servicesList/searchResults']);
  }
  //Event Handler on clicking clear All Filters
  clearAllFilters(){
    this.filterForm.reset();
    this.filterStore.clear();
    this.searchService.getFilterStore().clear();
    let cs:Search = this.searchService.getCurrentSearch();
    if(cs.filterSet==null || cs.filterSet==undefined){
      return;
    }
    let sr:Search[] = this.userSearches.filter(
      us => us.userId == this.loginService.currentUser.userName
      && us.searchType == cs.searchType
      && us.searchKeyword == cs.searchKeyword
      && us.sortField == cs.sortField
      && us.sortOrder == cs.sortOrder
      && (!us.filterSet || us.filterSet==null || !us.filterSet.id || us.filterSet.id==0)
    );
    console.log('searches->',sr);
    if(sr.length==1){
      this.searchService.setCurrentSearch(sr[0]);
      this.setResultScreenings(this.screeningList);
    }
    else if(sr.length>1){
      alert(`Multiple search results found without the filter, when clearing Filters!!`)
    }
    else {
      alert(`No Valid current search!! Please check the search results and verify!!`);
    }
    // this.router.navigate(['/servicesList/searchResults']);
  }
  //Event handler on changing the sort Field
  setSortField(){
      let sortField = this.sortFieldList?.filter(
      x => x == this.searchForm.get('sortBy')?.value
      )[0];
      console.log('Entered Set SortField??->',sortField);
      console.log('sortBy Value->',this.searchForm.get('sortBy')?.value);
      this.sortStore = sortField;
      if(this.getResultScreenings() && this.getResultScreenings().length>0){
        
        let search:Search = {
          userId: this.searchService.currentSearch.userId,
          searchType: this.searchService.currentSearch.searchType,
          searchKeyword: this.searchService.currentSearch.searchKeyword,
          filterSet: this.searchService.currentSearch.filterSet,
          sortField: sortField,
          sortOrder: this.searchService.currentSearch.sortOrder
        };
        let searches:Search[] = this.userSearches.filter(
          s => s.userId == this.loginService.currentUser.userName
          && s.searchType == search.searchType
          && s.searchKeyword == search.searchKeyword
          && (s.filterSet?.id == search.filterSet?.id || 
            this.matchFilterSet(<FilterSet>s.filterSet,<FilterSet>search.filterSet)
            )
          && s.sortField == search.sortField
          && s.sortOrder == search.sortOrder
          );
        //If a search already exists with the new sortfield,set it as current search and display results
        if(searches.length==1){
          console.log('Came into existing searches with sortfield??',searches);
          this.searchService.setCurrentSearch(searches[0]);
          this.setResultScreenings(this.getResultScreenings().sort(this.getCompareFunc(this.sortStore)));
        }
        //If multiple searches are found, unknown error
        else if(searches.length>1){
          alert(`More than one such searches are present!!`);
        }
        //If no searches are found, create the search, ensure it is saved, set it to current search and display
        //results
        else {
          this.sortStore = sortField;
          console.log('this.sortStore set??->',this.sortStore);
          this.searchService.addSearch(search)
          .subscribe(
            (searchAdded:boolean) => {
              if(searchAdded){
                this.searchService.getParticularSearch(search)
                .subscribe(
                  (savedSearch:Search[]) =>{
                    if(savedSearch.length==1){
                      this.searchService.setCurrentSearch(savedSearch[0]);
                      this.userSearches.push(savedSearch[0]);
                      this.setResultScreenings(this.getResultScreenings().sort(this.getCompareFunc(this.sortStore)));
                    }
                    else {
                      alert(`Search NOT Saved successfully on change of sortBy!!`);
                    }
                  }
                );
              }
              else {
                alert(`Search Not Added Successfully!`);
              }
            }
          );
        }

      }
      
      // this.searchService.setSortStore(this.sortStore);
      
      // this.router.navigate(['/servicesList/searchResults']);
    }
  //Event handler on changing the sort order
  toggle(){
    if(this.sort=="ASC"){
      
      this.sort = "DESC";
      // this.searchService.setSortOrder("DESC");
      console.log('this.sortStore available in toggle??->',this.sortStore);
      //If sort field is not empty,sort it based on the field and also in the particular order.
      if(this.screeningList.length!=0 && this.sort != ""){
        
            this.setSearchAndResultsInToggle(this.sort);
          }
          return;
        }
        if(this.sort == "DESC"){
          this.sort = "ASC";
        // this.searchService.setSortOrder("ASC");
        
        //If sort field is not empty,sort it based on the field and also in the particular order.
          if(this.screeningList.length!=0 && this.sort != ""){
            this.setSearchAndResultsInToggle(this.sort);
          }
          return;
        }

        
      }
  //Event handler on clicking search
  submit(){
    //Clear All Filters
    this.filterForm.reset();

    this.searchService.setSearchField(<string>this.searchForm.get('searchEntity')?.value);
    this.searchService.setSearchKeyword(<string>this.searchForm.get('searchBox')?.value);
    
    
    //If searchfield and search keyword are not empty, first filter results  using the searchkeyword.
    // Then, check filters and sort field.
    if(this.screeningList.length != 0 && <string>this.searchForm.get('searchEntity')?.value != "" && <string>this.searchForm.get('searchBox')?.value != ""){
      
      let rs = this.getScreeningsFromTitle(this.screeningList,<string>this.searchForm.get('searchEntity')?.value,<string>this.searchForm.get('searchBox')?.value);
      let search:Search = {
        userId: this.loginService.currentUser.userName,
        searchType: <string>this.searchForm.get('searchEntity')?.value,
        searchKeyword: <string>this.searchForm.get('searchBox')?.value,
        sortField: <string>this.searchForm.get('sortBy')?.value,
        sortOrder: <string>this.sort
      };
      let searchPresent:Search[] = this.userSearches.filter(
        (s:Search) => s.searchKeyword==search.searchKeyword
            && s.searchType == search.searchType
            && s.userId == search.userId
            && s.sortField == search.sortField
            && s.sortOrder == search.sortOrder
            && (s.filterSet==null)
            );
            console.log('Search button click results->',searchPresent);
            //If no such search exist, create it, save it, and then display results
      if(searchPresent.length == 0){
        //Creating the search and saving it on backend
        this.searchService.addSearch(search)
        .subscribe(
          (searchAdded:boolean) => {
            if(searchAdded){
              this.searchService.getParticularSearch(search)
              .subscribe(
                (resultSearch:Search[]) => {
                  if(resultSearch.length == 1){

                    this.searchService.setCurrentSearch(resultSearch[0]);
                    this.userSearches.push(resultSearch[0]);   
                    this.setResultScreenings(rs);
                  }
                  else {
                    alert(`Particular Search could not be retrieved!!`);
                  }
                }
              );
            }
            else {
              alert(`Search Not Added Successfully!`);
            }
          }
        );
      }
      //If multiple search results found, unknown error
      else if(searchPresent.length > 1){
        console.log('searchPresent->',searchPresent);
        alert(`Multiple Search Results found with the search parameters, whithout the filters!!`);
      }
      //If one search found, set it as current search and display results
      else {
        this.searchService.setCurrentSearch(searchPresent[0]);
        this.setResultScreenings(rs);
      }
      
    }
  }
  
  
  
  
  
  //Get screenings with the matching search Keyword value of the search field
  getScreeningsFromTitle(sc:Screening[],sfield:string,skword:string){
    return sc.filter(
      (s:Screening) => {
          let result:boolean = false;
          switch(sfield){
            case "title":{
              result = s.movie.title == skword
              break;
            }
            case "language":{
              result = s.movie.language == skword
              break;
            }
            case "genre": {
              result = s.movie.genres.findIndex(g => g.name == skword) >=0;
              break;
            }
            case "city": {
              result = s.theatre.address.city == skword;
              break;
            }
            case "state": {
              result = s.theatre.address.state == skword;
              break;
            }
          }
          return result;
        }
      );
    }
    
    //Get screenings with the filters Applied
    getScreeningsWithFilters(sc:Screening[],filters:Map<string,string|number>){
      console.log(filters);
      return sc.filter(
        s => {
          let result = true;
          if(filters.get('title')!= "" && filters.get('title')!=null){
            console.log('Entered title if??!');
            result = result && s.movie.title == filters.get('title');
          }
          if(filters.get('language')!= "" && filters.get('language')!=null){
            console.log('Entered language if??!!');
            result = result && s.movie.language == filters.get('language');
          }
          if(filters.get('amountMax')!= "" && filters.get('amountMax')!=null){
            result = result && <number>s.movie.price <= <number>parseInt(<string>filters.get('amountMax'));
          }
          if(filters.get('genre')!="" && filters.get('genre')!=null){
            console.log('existing genres',s.movie.genres);
            result = result && s.movie.genres.findIndex(g => g.name == filters.get('genre'))>=0;
          }
          if(filters.get('showName')!="" && filters.get('showName')!=null){
            console.log('existingShowName',s.showTime.showName);
            result = result && s.showTime.showName == filters.get('showName');
          }
          if(filters.get('date')!="" && filters.get('date')!=null){
            console.log('existing screening date->',s.date);
            console.log('date filter active ->',filters.get('date'));
            result = result && s.date.toString() == <string>filters.get('date');
          }
          if(filters.get('city')!="" && filters.get('city')!=null){
            result = result && s.theatre.address.city == filters.get('city');
          }
          if(filters.get('state')!="" && filters.get('state')!=null){
            result = result && s.theatre.address.state == filters.get('state');
          }
          return result;
        }
        );
    }

    
    //Utility method to compare the strings based on the order 'ASC' or 'DESC' reused several times
  compareStrings(x:string,y:string,order:string){
    if(order == "ASC"){
      if(x<y){
        return -1;
      }
      else {
        return 1;
      }
    } 
    else if(order == "DESC"){
      if(x<y){
        return 1;
      }
      else {
        return -1;
      }
    } 
    return 0;
  }

    //This method returns the Compare Function based on the sort Field
    getCompareFunc(sortField:string){
    let compareFunc;
      switch(sortField){
        case "title": {
          compareFunc = (a:Screening,b:Screening) => {
            let x = <string>a.movie.title.toUpperCase();
            let y = <string>b.movie.title.toUpperCase();
            return this.compareStrings(x,y,this.sort);
          };
          break;
        }
        case "language":{
          compareFunc = (a:Screening,b:Screening) => {
            let x = <string>a.movie.language.toUpperCase();
            let y = <string>b.movie.language.toUpperCase();
            return this.compareStrings(x,y,this.sort);
          };
          break;
        }
        case "amountMax":{
          compareFunc = (a:Screening,b:Screening) => {
            if(this.sort == "ASC"){
              return <number>a.movie.price - <number>b.movie.price;
            }
            else if(this.sort == "DESC"){
              return <number>b.movie.price - <number>a.movie.price;
            }
            return 0;
          };
          break;
        }
        case "genre": {
          compareFunc = (a:Screening,b:Screening) => {
            let x = a.movie.genres;
            let y = b.movie.genres;
            if(this.sort == "ASC"){
              if(x.length == y.length){
                if(x[0]<y[0]){
                  return -1;
                }
                else {
                  return 1;
                }
              }
              else{
                return x.length - y.length;
              }
            }
            else if(this.sort == "DESC"){
              if(x.length == y.length){
                if(x[0]<=y[0]){
                  return 1;
                }
                else {
                  return -1;
                }
              }
              else {
                return y.length - x.length;
              }
            }
            return 0;
          };
          break;
        }
        case "showName": {
          compareFunc = (a:Screening,b:Screening) => {
            let defaultOrder:string[] = ["MORNING SHOW","MATINEE SHOW","FIRST SHOW","SECOND SHOW"];
            let x = defaultOrder.findIndex(d => d == <string>a.showTime.showName.toUpperCase());
            let y = defaultOrder.findIndex(d => d == <string>b.showTime.showName.toUpperCase());
            // return this.compareStrings(x,y,this.sort);
            //If index not found, return 0, i.e., no result in comparison, as the value is likely invalid.
            if(x<0 || y<0){
              return 0;
            }
            //If ascending/descending and both indexes are positive or zero
            // , compare index and return result accordingly
            if(this.sort == "ASC"){
              return x<y?-1:1;
            }
            else if(this.sort == "DESC"){
              return x<y?1:-1;
            }
            return 0;
          };
          break;
        }

        case "date": {
          compareFunc = (a:Screening,b:Screening) => {
            let x = a.date;
            let y = b.date;
            if(this.sort == "ASC"){
              console.log('x<y date comparison',x<=y);
              return x<=y ? -1:1;
            }
            else if(this.sort == "DESC"){
              console.log('x<y date comparison',x<=y);
              return x<=y ? 1: -1;
            }
            return 0;
          };
          break;
        }
        case "city": {
          compareFunc = (a:Screening,b:Screening) => {
            let x = a.theatre.address.city.toUpperCase();
            let y = b.theatre.address.city.toUpperCase();
            return this.compareStrings(x,y,this.sort);
          };
          break;
        }
        case "state": {
          compareFunc = (a:Screening,b:Screening) => {
            let x = a.theatre.address.state.toUpperCase();
            let y = b.theatre.address.state.toUpperCase();
            return this.compareStrings(x,y,this.sort);
          };
          break;
        }
      }
      return compareFunc;
  }
  //This is a utility method used in toggle() method when we toggle sort order between ASC and DESC
  setSearchAndResultsInToggle(sortOrder:string){
    let searches:Search[] = this.userSearches.filter(
      sr => sr.userId == this.loginService.currentUser.userName
      && sr.searchType == this.searchService.currentSearch.searchType
      && sr.searchKeyword == this.searchService.currentSearch.searchKeyword
      && sr.sortField == this.searchService.currentSearch.sortField
      && sr.sortOrder == sortOrder
      && (this.matchFilterSet(<FilterSet>sr.filterSet,this.searchService.currentSearch.filterSet)
      || sr.filterSet?.id == this.searchService.currentSearch.filterSet?.id)
      );
      console.log('searchResults when toggling??->',searches);
      console.log('this.userSearches in toggling?->',this.userSearches);
      if(searches.length==1){
        console.log('Entered existing searches on toggle??->',searches);
        this.searchService.setCurrentSearch(searches[0]);
        
        this.setResultScreenings(this.getResultScreenings().sort(this.getCompareFunc(this.sortStore)));
        console.log('this.getResultScreenings()->',this.getResultScreenings());
        console.log('this.sortStore->',this.sortStore);
      }
      else if(searches.length>1){
        alert(`Multiple searches found when sorting in ${sortOrder} order!!`);
      }
      else {
        let search:Search = {
          userId: this.loginService.currentUser.userName,
          searchType: this.searchService.currentSearch.searchType,
          searchKeyword: this.searchService.currentSearch.searchKeyword,
          filterSet: this.searchService.currentSearch?.filterSet,
          sortField: this.searchService.currentSearch.sortField,
          sortOrder: sortOrder
        };
        this.searchService.addSearch(search)
        .subscribe(
          (searchSaved:boolean) =>{
            if(searchSaved){
              this.searchService.getParticularSearch(search)
              .subscribe(
                (savedSearches:Search[]) => {
                  if(savedSearches.length==1){
                    this.searchService.setCurrentSearch(savedSearches[0]);
                    this.userSearches.push(savedSearches[0]);
                    this.setResultScreenings(this.getResultScreenings().sort(this.getCompareFunc(this.sortStore))); 
                    console.log('this.getResultScreenings()->',this.getResultScreenings());
                    console.log('this.sortStore->',this.sortStore);
                  }
                else {
                  alert(`Unable to retrieve saved search during sorting in ${sortOrder} order!! Unknown error!`);
                }
              }
            );
          }
          else{
            alert(`Search NOT Saved successfully!`);
          }
        }
      );
    }
  }
  //Utility method, to check if a search already exists,
  // with an existing saved filter, and display results accordingly
  finalizeSearchWithFilterSet(fs:FilterSet,uid:string,se:string,sk:string,sf:string,so:string){
    //The filterSet fs provided in the args above, is assumed as an existing, saved filterSet in the database.
    console.log('Default value of the filterSetId??->',fs);
    let sresults:Search[] = this.userSearches.filter(us => 
      us.userId == uid
        && us.searchType == se
        && us.searchKeyword == sk
        && us.sortField == sf
        && us.sortOrder == so
        && this.matchFilterSet(<FilterSet>us.filterSet,fs)
        );
      console.log('sresults in finalizeSearchWithFilterSet->',sresults);
    //If one search result exists, with the provided filterSet, set the search as current Search, and display results
    if(sresults.length == 1){
      this.searchService.setCurrentSearch(sresults[0]);
      console.log('Current Search Found??!!');
      this.setResultScreenings(this.getScreeningsWithFilters(this.getResultScreenings(),this.filterStore));
    }
    //If multiple search results present,with the provided filterSet, unknown error!!
    else if(sresults.length > 1){
      alert(`Multiple search Results found with the same filterSet!!`)
    }
    //If no such search is present, with the given filterSet, go ahead and create new search with the filter,
    //and display result
    else {
      let search:Search = {
        userId: uid,
        searchType: se,
        searchKeyword: sk,
        filterSet: fs,
        sortField: sf,
        sortOrder: so
      };
      this.searchService.addSearch(search)
      .subscribe(
        (searchSaved:boolean) =>{
          if(searchSaved){
            console.log('New Search with filters saved??!!',searchSaved);
            this.searchService.getParticularSearch(search)
            .subscribe(
              (results:Search[]) =>{
                if(results.length==1){
                  console.log('New search retrieved??!!',results[0]);
                  this.searchService.setCurrentSearch(results[0]);
                  this.userSearches.push(results[0]);
                  this.filterSets.push(<FilterSet>results[0].filterSet);
                  //Display results once all the search saving etc. are done.
                  this.setResultScreenings(this.getScreeningsWithFilters(this.getResultScreenings(),this.filterStore));
                }
                else{alert(`Multiple Results found in the backend!! Particular search could not be retrieved when applying filters!!`);}
              }
            );
          }
          else{alert(`Search NOT Saved to the database when applying filters!!`);}
        }
      );
    }
  }

  //utility method to check the matching filterSet
  matchFilterSet(iterableElement:FilterSet,providedElement:FilterSet){
    if(iterableElement == undefined || iterableElement==null){
      return providedElement == undefined || providedElement == null;
    }
    else {

    
    return iterableElement.title == providedElement.title
    && iterableElement.language == providedElement.language
    && iterableElement.amountMax == providedElement.amountMax
    && iterableElement.genre == providedElement.genre
    && iterableElement.showName == providedElement.showName
    && iterableElement.date.toString() == providedElement.date.toString()
    && iterableElement.city == providedElement.city
    && iterableElement.state == iterableElement.state;
    }
  }
}
