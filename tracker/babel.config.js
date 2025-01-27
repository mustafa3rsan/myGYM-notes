module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@': './', // Proje kökü alias olarak ayarlandı
          },
        },
      ],
    ],
  };
};