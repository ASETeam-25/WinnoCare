export class AppConstants {
    public static URL: string = "http://localhost:8080/api/auth";
    //public static URL: string = "https://winnocareapp.azurewebsites.net/api/auth";
    public static NAME_PATTERN: string = "^[a-zA-Z]*$";
    public static AGE_PATTERN: string = "^[0-9]{1,3}$";
    public static CONTACT_PATTERN: string = "^(\\+\\d{1,2}\\s?)?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$";
    public static EMAIL_PATTERN: string = "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$";
    public static USERNAME_PATTERN: string = "^[a-zA-Z0-9_-]*$";
    public static PASSWORD_PATTERN: string = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$";
}
