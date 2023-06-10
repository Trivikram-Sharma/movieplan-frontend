export default class genreapi{
    public static prefix = "http://localhost:8081";

    public static genreprefix = "/api/genre";

    public static addgenre = this.prefix + this.genreprefix + "/add";

    public static getAllGenres = this.prefix + this.genreprefix + "/all";

    public static getAllGenresWithName = this.prefix + this.genreprefix + "/search";

    public static getMoviesWithGenre = this.prefix + this.genreprefix + "/search/movie";

    public static deleteGenre = this.prefix + this.genreprefix + "/delete";
}