# R/GA code challenge - Fernando Medina

## Challenge requirements:
1. Show a weather forecast for the current week and area of the user. Use the following API: metaweather.com/api/
2. The forecast day should display the name of the day and tempeture, also the weather icon from the same API
3. Add a "Emergency light" section where you can turn on the flash of the phone
4. Add a "Loud detector" section that shows a ray icon when there is a loud noise

Extra features I did that are not required in the code challenge:
* Message that redirects to settings when the user deny permissions
* UI library and theme
* Typescript

Important notes:
* I have experience with Redux but the app does not use Redux because is not needed in the app, using something when is not needed is a wrong desition in my opninion, so I decided to not add Redux to show that opinion. You can see how I use Redux with Typescript [in this repository.](https://github.com/fermmm/boilerplate-typescript-react-redux-webpack)

* I have experience with hooks and I like them, but I didn't use them in this test since I was limited in time and sometimes I find incompatibilities that I have to spend time solving.

## Installation

1. Run: `npm install -g expo-cli`
2. Run: `npm install`
3. Run: `npm run eject` select the option: `ExpoKit: I'll create or log in with an Expo...`

----

#### To run the project

1. Run: `npm start`
2. Open Android Studio
3. Open the project in the "android" folder
4. Go to File > Sync Project with Gradle Files
4. Run in device or emulator

