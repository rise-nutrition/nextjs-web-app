/* eslint-disable */
require("dotenv").config()

const path = require("path")
const Dotenv = require("dotenv-webpack")

const aliasDirectories = ["components", "util"]

module.exports = {
    webpack: config => {
        aliasDirectories.forEach(val => {
            config.resolve.alias[val] = path.join(__dirname, val)
        })
        
        config.plugins = config.plugins || []
        config.plugins = [
            ...config.plugins,

            // Read the .env file
            new Dotenv({
                path: path.join(__dirname, ".env"),
                systemvars: true
            })
        ]

        return config
    },
}
