// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: ['babel-preset-expo'],
//     plugins: [
//       'react-native-reanimated/plugin', // 항상 마지막!
//     ],
//   };
// };

// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // (다른 플러그인 한 줄도 넣지 말고)
      'react-native-reanimated/plugin', // ← 반드시 마지막 & 유일
    ],
  };
};
