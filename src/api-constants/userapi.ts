export default class userapi{
public static  prefix = "https://localhost:8081";
    
    public static  signUp = this.prefix + "/api/user/signUp";
    public static  signIn= this.prefix + "/api/user/signIn";
    public static  changePassword= this.prefix + "/api/user/changePassword";
    public static  signOut= this.prefix + "/api/user/signOut";

} 