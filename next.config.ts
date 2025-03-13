import type { NextConfig } from 'next'

import path from 'path'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    additionalData: `@use '@/styles/helpers' as *;`,
  },
  webpack: (config, { isServer }) => {
    if (process.env.ANALYZE === 'true') {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: isServer ? 8890 : 8888,
          openAnalyzer: true,
          reportFilename: isServer ? '../analyze/server.html' : './analyze/client.html',
          defaultSizes: 'parsed',
          generateStatsFile: false,
          logLevel: 'info',
        }),
      )
    }

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: [
            {
              loader: '@svgr/webpack',
              options: {
                icon: '1em',
                svgoConfig: {
                  plugins: [
                    {
                      name: 'convertColors',
                      params: { currentColor: true },
                    },
                  ],
                },
              },
            },
          ],
          as: '*.js',
        },
      },
    },
  },
}

export default nextConfig
