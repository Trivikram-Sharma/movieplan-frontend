export default class addressapi{
    public static prefix = "http://localhost:8081";

    public static addressprefix = "/api/address";
    
    public static getAddress = addressapi.prefix + addressapi.addressprefix;

    //GET APIs

    public static getAllAddresses = this.prefix + this.addressprefix + "/search/";

    public static getAllAddressesWithStreet = this.prefix + this.addressprefix + "/search/street";

    public static getAllAddressesWithArea = this.prefix + this.addressprefix + "/search/area";
    
    public static getAllAddressesWithCity = this.prefix + this.addressprefix + "/search/city";
    
    public static getAllAddressesWithState = this.prefix + this.addressprefix + "/search/state";
    
    public static getAllAddressesWithCountry = this.prefix + this.addressprefix + "/search/country";
    
    public static getAllAddressesWithPincode = this.prefix + this.addressprefix + "/search/pincode";
    
    public static getAllAddressesHavingStreetName = this.prefix + this.addressprefix + "/search/street";
    
    public static getAllAddressesHavingArea = this.prefix + this.addressprefix + "/search/area";


    //POST APIs
    public static addAddress = this.prefix + this.addressprefix + "/add";

    //PATCH APIs
    public static updateAddress = this.prefix + this.addressprefix + "/update";

    public static updateAddressStreet = this.prefix + this.addressprefix + "/update/street";
    
    public static updateAddressArea = this.prefix + this.addressprefix + "/update/area";
    
    public static updateAddressCity = this.prefix + this.addressprefix + "/update/city";
    
    public static updateAddressState = this.prefix + this.addressprefix + "/update/state";
    
    public static updateAddressCountry = this.prefix + this.addressprefix + "/update/country";
    
    public static updateAddressPincode = this.prefix + this.addressprefix + "/update/pincode";

    //DELETE APIs

    public static deleteAddress = this.prefix + this.addressprefix + "/delete";
    
    public static deleteAddressesWithStreet = this.prefix + this.addressprefix + "/delete/street";
    
    public static deleteAddressesWithArea = this.prefix + this.addressprefix + "/delete/area";
    
    public static deleteAddressesWithCity = this.prefix + this.addressprefix + "/delete/city";
    
    public static deleteAddressesWithState = this.prefix + this.addressprefix + "/delete/state";
    
    public static deleteAddressesWithCountry = this.prefix + this.addressprefix + "/delete/country";
    
    public static deleteAddressWithPincode = this.prefix + this.addressprefix + "/delete/pincode";
}