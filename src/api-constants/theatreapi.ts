export default class theatreapi{
    public static prefix = "http://localhost:8081";

    public static theatreprefix = "/api/theatre";

    public static addTheatre = this.prefix + this.theatreprefix + "/add";
    
    //GET APIs
    public static getAllTheatres = this.prefix + this.theatreprefix + "/search/all";
    public static getTheatreWithId = this.prefix + this.theatreprefix + "/search/id";
    public static getTheatreWithName = this.prefix + this.theatreprefix + "/search/name";
    public static getTheatreWithScreens = this.prefix + this.theatreprefix + "/search/screens";
    public static getTheatreWithAddress = this.prefix + this.theatreprefix + "/search/address";

    //PATCH APIs
    public static updateTheatreName = this.prefix + this.theatreprefix + "/update/name";
    public static updateTheatreScreens = this.prefix + this.theatreprefix + "/update/screen";
    public static updateTheatreAddress = this.prefix + this.theatreprefix + "/update/address";

    //DELETE APIs
    public static deleteAllTheatreScreens = this.prefix + this.theatreprefix + "/delete/screens";
    public static deleteTheatre = this.prefix + this.theatreprefix + "/delete";

}