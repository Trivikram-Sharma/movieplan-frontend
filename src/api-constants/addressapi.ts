export default class addressapi{
    public static prefix = "http://localhost:8081";

    public static addressprefix = "/api/address";
    
    public static getAddress = addressapi.prefix + addressapi.addressprefix;

    public static getAllAddresses = this.prefix + this.addressprefix + "/search/";
}