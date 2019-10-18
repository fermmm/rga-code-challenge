import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import * as Permissions from "expo-permissions";
import { withTheme, ActivityIndicator, Button, Surface } from "react-native-paper";
import { ThemeExt, Themed } from "../../../common-tools/themes/types/Themed";
import { Styles } from "../../../common-tools/ts-tools/Styles";
import Api from "../../../Api/Api";
import BasicPageLayout from "../../common/BasicPageLayout/BasicPageLayout";
import { WeatherDay } from "../../../Api/types/types";
import { getGeolocation } from "../../../common-tools/geolocation/getGeolocation";
import { askForPermissions } from "../../../common-tools/permissions/askForPermissions";
import { NavigationScreenProp, NavigationContainerProps, ScrollView } from "react-navigation";
import DateTools from "../../../common-tools/DateTools/DateTools";
import { currentTheme } from "../../../config";

interface PropsMainPage extends Themed, NavigationContainerProps { }
interface State { 
   weatherForecast: WeatherDay[];
}

class MainPage extends Component<PropsMainPage, State> {
   state: State = {
      weatherForecast: null
   };

   async componentDidMount(): Promise<void> {
      await askForPermissions(Permissions.LOCATION);
      this.setState({ 
         weatherForecast: await Api.getWeatherForecast(await getGeolocation())
      });
   }

   render(): JSX.Element {
      const { colors, fonts }: ThemeExt = this.props.theme as unknown as ThemeExt;
      const { navigate }: NavigationScreenProp<{}> = this.props.navigation;
      const { weatherForecast }: State = this.state;

      return (
         <BasicPageLayout>
            <ScrollView style={styles.mainScroll}>            
               <View style={styles.mainContainer}>
                  <View style={styles.weatherItemsContainer}>
                     {
                        weatherForecast == null ?
                           <ActivityIndicator size="large"/>
                        :
                           weatherForecast.map((weatherDay: WeatherDay, i) => 
                              <Surface style={styles.weatherItem} key={i}>
                                 <Text style={[styles.textBlock, { color: colors.text, fontFamily: fonts.light }]}>
                                    {DateTools.getDayName(
                                       DateTools.getDateFromWeatherFormat(
                                          weatherDay.applicable_date
                                       )
                                    )} {" "}
                                    {Math.round(weatherDay.the_temp)} Cº
                                 </Text>
                                 <Image
                                    source={{uri: Api.getIconURL(weatherDay)}} 
                                    style={{width: 30, height: 30}} 
                                 />
                              </Surface>
                           )
                     }
                  </View>
                  <Button icon="flash-on" mode="contained" onPress={() => navigate("LoudDetector")} style={styles.settingsButton}>
                     Loud Detector
                  </Button>
                  <Button icon="wb-sunny" mode="contained" onPress={() => navigate("EmergencyLight")} style={styles.settingsButton}>
                     Emergency Light
                  </Button>
               </View>
            </ScrollView>
         </BasicPageLayout>
      );
   }
}

const styles: Styles = StyleSheet.create({
   mainContainer: {
      flex: 1,
      width: "100%",
      alignItems: "center",
      justifyContent: "flex-start",
      paddingTop: 60,
   },
   mainScroll: {
      width: "100%",
      height: "100%"
   },
   weatherItemsContainer: {
      width: "100%",
      marginBottom: 30,
   },
   weatherItem: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 10,    
      paddingRight: 25,
      paddingLeft: 25,
      paddingBottom: 10,
      paddingTop: 10,
      borderRadius: 30,
      backgroundColor: currentTheme.colors.primary2
   },
   settingsButton: {
      width: "100%",
      marginBottom: 10
   },
   textBlock: {
      flex: 1,
      fontSize: 20,
   },

});

export default withTheme(MainPage);