import { ConfigContext, ExpoConfig } from 'expo/config';
const config = ({ config }: ConfigContext): ExpoConfig => ({
  name: 'mobile',
  slug: 'mobile',
  version: '1.0.0',
  scheme: 'e-comers-app', // deep link (e-comers-app://)
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  newArchEnabled: true,
  splash: {
    image: './assets/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff'
  },
  ios: {
    supportsTablet: true
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff'
    }
  },
  web: {
    favicon: './assets/favicon.png'
  }
});
