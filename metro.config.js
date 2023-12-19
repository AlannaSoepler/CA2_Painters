/* eslint-disable no-undef */
// Learn more https://docs.expo.io/guides/customizing-metro
//This was to help with the error: Unable to resolve "./App" from "App.js" when using expo start and zod
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

module.exports = (async () => {
  const {
    resolver: { sourceExts },
  } = config;

  return {
    ...config,
    resolver: {
      ...config.resolver,
      sourceExts: [...sourceExts, 'mjs'],
    },
  };
})();
