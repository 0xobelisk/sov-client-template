/** @type {import('next').NextConfig} */

// const nextConfig = {
//   output: 'export',
//
//   // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
//   trailingSlash: true,
//
//   // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
//   // skipTrailingSlashRedirect: true,
//
//   // Optional: Change the output directory `out` -> `dist`
//   distDir: 'dist',
// }

// const nextConfig = {
//   webpack: (config, { isServer }) => {
//     // 添加对 .wasm 文件的支持
//     config.experiments = {
//       asyncWebAssembly: true,
//       syncWebAssembly: true,
//       layers: true,
//     };

//     config.module.rules.push({
//       test: /\.wasm$/,
//       type: 'webassembly/async',
//     });

//     return config;
//   },
// };


// const nextConfig = {
//   webpack: (config) => {
//       config.experiments = {
//           asyncWebAssembly: true,
//           syncWebAssembly: true,
//           layers: true,
//           outputModule: true,
//       };
//       return config;
//   }
// };
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/sov-rpc',
        destination: 'http://localhost:12345/',
      },
    ]
  },
};



module.exports = {
  transpilePackages: ["@repo/ui"],
  ...nextConfig
};
