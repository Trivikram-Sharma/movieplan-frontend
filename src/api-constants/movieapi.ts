export default class movieapi{
    public static prefix = "http://localhost:8081";

    public static movieprefix = "/api/movie";

    //CREATE APIs
    public static addMovie = this.prefix + this.movieprefix + "/add";

    //GET APIs
    public static getNewId = this.prefix + this.movieprefix + "/getNewId";
    public static getAllMovies = this.prefix + this.movieprefix + "/search";
    public static getMoviesByTitle = this.prefix + this.movieprefix + "/search/title";
    public static getMoviesInPriceRange = this.prefix + this.movieprefix + "/search/pricerange";
    public static getMoviesOfLanguage = this.prefix + this.movieprefix+ "/search/language";
    public static getMoviesByGenre = this.prefix + this.movieprefix + "/search/genre";
    public static getMoviesByReleaseDate = this.prefix + this.movieprefix + "/search/releaseDate";
    public static getMoviesContainingTitle = this.prefix + this.movieprefix + "/search/title";
    public static getMoviesWithTicketPrice = this.prefix + this.movieprefix + "/search/price";
    public static getEnabledMovies = this.prefix + this.movieprefix + "/search/enabled";
    public static getDisabledMovies = this.prefix + this.movieprefix + "/search/disabled";

    //UPDATE APIs
    public static updateMovieTitle = this.prefix + this.movieprefix + "/update/title";
    public static updateMoviePrice = this.prefix + this.movieprefix + "/update/price";
    public static updateMovieLanguage = this.prefix + this.movieprefix + "/update/language/";
    public static updateMovieDescription = this.prefix + this.movieprefix + "/update/description";
    public static enableMovie = this.prefix + this.movieprefix + "/update/enable";
    public static disableMovie = this.prefix + this.movieprefix + "/update/disable";
    public static updateMovieWithGenre = this.prefix + this.movieprefix + "/update/addGenre";
    public static updateMovieWithGenres = this.prefix + this.movieprefix + "/update/addGenres";
    
    //DELETE APIs
    public static deleteGenreFromMovie = this.prefix + this.movieprefix + "/delete/genre";
    public static deleteGenresFromMovie = this.prefix + this.movieprefix + "/delete/genres";
    public static deleteMovie = this.prefix + this.movieprefix + "/delete";
}