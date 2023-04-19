export default class adminapi{
    public static  prefix = "http://localhost:8081";

    public static adminLogin = this.prefix + "/api/admin/login";
    public static adminLogout = this.prefix + "/api/admin/logout";
}