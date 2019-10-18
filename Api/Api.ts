import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import * as Location from "expo-location";
import { LocationSearchResult, WeatherResponse, WeatherDay } from "./types/types";
import { Alert } from "react-native";

export default class Api {
   public static baseURL: string = "https://www.metaweather.com/api/location/";
   public static baseURLIcons: string = "https://www.metaweather.com/static/img/weather/png/64/";

   /**
    * Axios request wrapper with error handling.
    * @param options Axios request options, example: {url: "search/users"}
    * @param showAlertOnError Shows a native alert to the user when the request has a network error
    * @returns When there is an error in the request returns a string resolved promise with the error text.
    */
   public static async request<T>(options: AxiosRequestConfig, showAlertOnError: boolean = true): Promise<T | string> {
      const client: AxiosInstance = axios.create({
         baseURL: Api.baseURL,
      });

      return client(options)
         .then((response) => {
            return response.data;
         })
         .catch((error) => {
            console.debug("Request Failed:", error.config);

            if (error.response) {
               // Request was made but server responded with something
               // other than 2xx
               console.debug("Status:", error.response.status);
               console.debug("Data:", error.response.data);
               console.debug("Headers:", error.response.headers);

               if (showAlertOnError) {
                  Alert.alert(
                     `Error ${error.response.status}`,
                     `${error.response || error.message}, please try again later`,
                     [
                        { text: "OK" },
                     ],
                     { cancelable: false }
                  );
               }
            } else {
               // Something else happened while setting up the request
               // triggered the error
               console.debug("Error Message:", error.message);

               if (showAlertOnError) {
                  Alert.alert(
                     "Connection problem",
                     "Make sure your device is connected to the internet and try again",
                     [
                        { text: "OK" },
                     ],
                     { cancelable: false }
                  );
               }
            }

            return Promise.resolve(error.response || error.message);
         });
   }

   public static async getWeatherForecast(location: Location.LocationData): Promise<WeatherDay[]> {
      const geolocationSearch: LocationSearchResult[] | string = await Api.request(
         { url: `search/?lattlong=${location.coords.latitude},${location.coords.longitude}` }
      );

      if (typeof geolocationSearch === "string") {
         return Promise.resolve(null);
      }

      const weatherSearch: WeatherResponse | string = await Api.request(
         { url: `${geolocationSearch[0].woeid}` }
      );

      if (typeof weatherSearch === "string") {
         return Promise.resolve(null);
      }

      return Promise.resolve(weatherSearch.consolidated_weather);
   }

   public static getIconURL(weatherDay: WeatherDay): string {
      return Api.baseURLIcons + weatherDay.weather_state_abbr + ".png";
   }
}
