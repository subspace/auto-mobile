module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    '@babel/plugin-transform-private-methods',
    '@babel/plugin-transform-private-property-in-object',
    '@babel/plugin-transform-class-properties',
    '@babel/plugin-transform-class-static-block',
  ],
};
