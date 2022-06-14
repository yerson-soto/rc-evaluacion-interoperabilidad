const CracoAntDesignPlugin = require("craco-antd");

// TODO: Modify default theme
module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: {
          "@primary-color": "#ff62e0",
          "@link-color": "#ff62e0",
        },
      },
    },
  ],
};