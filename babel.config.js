module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { esmodules: true, node: true } }],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
};
