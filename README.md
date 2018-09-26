# WhatevAR

WhatevAR is an augmented reality (AR) application built with ViroReact developer platform and React Native. The app takes the user's current location and projects virtual icons representing local bars and restaurants when user is scanning his surroundings. User can hover over an icon to see information about particular establishment such as categories, Yelp rating and price range, then click on the icon to see a full screen modal containing contact details, opening times, pictures and Food Hygiene rating.

NOTES:
* The app currently works on IOS devices
* Food Hygiene Rating information is available in central Manchester area

## Installation

Clone this repository using command below:

`$ git clone https://github.com/ezg27/FE-whatevAR`

Navigate to cloned repository and install all dependencies and dev dependencies on your computer:

`$ npm install`

Create config.js file with ViroReact API key which you will get for free here https://viromedia.com/viroreact/
Your config file should look like this:

```javascript
export default apiKey = 'your api key';
```

Run the following command from the root of this project:

`$ npm start`

## Instructions for running the app on your iPhone

1. Turn your location services on.
2. Download Viro Media app from App Store, slide out the left panel and select "Enter Testbed".
3. Follow the instructions on the screen.

Enjoy!

## Authors

* George Hams - [ezg27](https://github.com/ezg27)
* Dorota Sobkow - [dsobkow](https://github.com/dsobkow)
* Daniel Lewis - [dlewismcr](https://github.com/dlewismcr)
* Jan Machacek - [JanMach97](https://github.com/JanMach97)




