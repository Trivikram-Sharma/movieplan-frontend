export default class showtimeapi{
    public static prefix = "http://localhost:8081";

    public static showtimeprefix = "/api/showtime";

    public static addShowTime = this.prefix + this.showtimeprefix + "/add";
    public static getShowTimesByName = this.prefix + this.showtimeprefix + "/search";
    public static deleteShowTime = this.prefix + this.showtimeprefix + "/delete";
}