export default class DateTools {
   public static days: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
   
   public static getDateFromWeatherFormat(date: string): Date {
      const splittedDate: string[] = date.split("-");
      return new Date(Number(splittedDate[0]), Number(splittedDate[1]), Number(splittedDate[2]));
   }

   public static getDayName(date: Date): string {
      return DateTools.days[date.getDay()];
   }
}