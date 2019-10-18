import MainPage from "./components/pages/MainPage/MainPage";
import React, { Component } from "react";
import { AppLoading } from "expo";
import { Provider as PaperProvider } from "react-native-paper";
import { loadFontMontserrat } from "./common-tools/fontLoaders/loadFontMontserrat";
import { currentTheme } from "./config";
import { NavigationContainer, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoudDetectorPage from "./components/pages/LoudDetectorPage/LoudDetectorPage";
import EmergencyLightPage from "./components/pages/EmergencyLightPage/EmergencyLightPage";

const Navigator: NavigationContainer = createAppContainer(
    createStackNavigator(
    {
        Main: { screen: MainPage },
        LoudDetector: { screen: LoudDetectorPage },
        EmergencyLight: { screen: EmergencyLightPage },
    }, 
    { 
        headerMode: "none",
    },
));

interface PageBasicWrapperState {
    resourcesLoaded: boolean;
}

export default class App extends Component<{}, PageBasicWrapperState> {
    state: PageBasicWrapperState = {
        resourcesLoaded: false,
    };

    async componentDidMount(): Promise<void> {
        await loadFontMontserrat();
        this.setState({ resourcesLoaded: true });
    }

    render(): JSX.Element {
        if (!this.state.resourcesLoaded) {
            return <AppLoading />;
        }

        return (
            <PaperProvider theme={currentTheme}>                
                <Navigator />
            </PaperProvider>
        );
    }
}
