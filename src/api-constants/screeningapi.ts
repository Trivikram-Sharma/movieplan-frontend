export default class screeningapi{
    public static prefix = "http://localhost:8081";

    public static screeningprefix = "/api/screening";

    //GET APIs
    public static addScreening = this.prefix + this.screeningprefix + "/add" ;
    public static getAllScreenings = this.prefix + this.screeningprefix + "/search/all";
    public static getAllScreeningsWithTheatre = this.prefix + this.screeningprefix + "/search/theatre";
    public static getAllScreeningsWithMovie = this.prefix + this.screeningprefix + "/search/movie";
    public static getAllScreeningsAtShowTime = this.prefix + this.screeningprefix + "/search/showtime";
    public static getAllScreeningsOnDate = this.prefix + this.screeningprefix + "/search/date";

    //PATCH APIs
    public static updateScreeningMovie = this.prefix + this.screeningprefix + "/update/movie";
    public static updateScreeningTheatre = this.prefix + this.screeningprefix + "/update/theatre";
    public static updateScreeningShowTime = this.prefix + this.screeningprefix + "/update/showtime";
    public static updateScreeningStatus = this.prefix + this.screeningprefix + "/update/status";
    public static updateScreeningDate = this.prefix + this.screeningprefix + "/update/date";

    //DELETE APIs
    public static deleteScreeningTheatre = this.prefix + this.screeningprefix + "/delete/theatre";
    public static deleteScreeningMovie = this.prefix + this.screeningprefix + "/delete/movie";
    public static deleteScreeningShowTime = this.prefix + this.screeningprefix + "/delete/showtime";
    public static deleteScreeningDate = this.prefix + this.screeningprefix + "/delete/date";
    public static deleteScreening = this.prefix + this.screeningprefix + "/delete";
}