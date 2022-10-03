const CracoAntDesignPlugin = require("craco-antd");

// TODO: Modify default theme
module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: {}
      },
    },
  ]
};