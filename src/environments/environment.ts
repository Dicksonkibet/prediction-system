// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl:"http://localhost:5277/api",
  defaultauth: 'fackbackend',
  firebaseConfig: {
    apiKey: "AIzaSyCL35dnu77bR-0YITsGfIfoT3hXsj7VzaY",
    authDomain: "credit-risk-system.firebaseapp.com",
    projectId: "credit-risk-system",
    storageBucket: "credit-risk-system.appspot.com",
    messagingSenderId: "371481783491",
    appId: "1:371481783491:web:431c6ba3eae2be81fd4676"
  }
};



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
