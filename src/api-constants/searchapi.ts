export default class searchapi{
    public static prefix = "http://localhost:8081";

    public static searchprefix = "/api/search";

    //POST APIS
    public static addSearch = this.prefix + this.searchprefix + "/add";
    
    public static getParticularSearch = this.prefix + this.searchprefix + "/getParticular";
    
    //GET APIs
    public static getAllSearches = this.prefix + this.searchprefix + "/get/all";

    public static getAllSearchesByUser = this.prefix + this.searchprefix + "/get/userId";


    //PATCH APIs

    public static updateSearch = this.prefix + this.searchprefix + "/update";

    //DELETE APIs
    public static deleteSearch = this.prefix + this.searchprefix + "/delete";
}