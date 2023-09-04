export default class filtersetapi{
    public static prefix = "http://localhost:8081";

    public static filtersetprefix = "/api/filterset";

    public static getAllFilterSets = this.prefix + this.filtersetprefix + "/get/all";
}