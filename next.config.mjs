/** @type {import('next').NextConfig} */

const subDirectory = process.env.SUB_DIRECTORY

const nextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"]
        });
        return config;
    },
    basePath: subDirectory ? subDirectory : "",
    publicRuntimeConfig: {
        basePath: subDirectory ? subDirectory : "",
    }
};

export default nextConfig;
