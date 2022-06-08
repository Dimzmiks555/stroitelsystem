const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/daygrid',
  '@fullcalendar/interaction',
  '@fullcalendar/list',
  '@fullcalendar/react',
  '@fullcalendar/timegrid',
  '@fullcalendar/timeline',
]);
const withPWA = require("next-pwa");

module.exports = withPWA(
  withTM({
    pwa: {
      dest: "public",
      register: true,
      skipWaiting: true,
      // disable: process.env.NODE_ENV === "development",
    },
    swcMinify: false,
    trailingSlash: true,
    env: {
      HOST_API_KEY: process.env.NEXT_PUBLIC_HOST,
      // FIREBASE AUTH
      FIREBASE_API_KEY: '',
      FIREBASE_AUTH_DOMAIN: '',
      FIREBASE_PROJECT_ID: '',
      FIREBASE_STORAGE_BUCKET: '',
      FIREBASE_MESSAGING_SENDER_ID: '',
      FIREBASE_APPID: '',
      FIREBASE_MEASUREMENT_ID: '',
      // AWS COGNITO AUTH
      AWS_COGNITO_USER_POOL_ID: '',
      AWS_COGNITO_CLIENT_ID: '',
      // AUTH0 AUTH
      AUTH0_CLIENT_ID: '',
      AUTH0_DOMAIN: '',
      //
      MAPBOX: '',
    },
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
}));
