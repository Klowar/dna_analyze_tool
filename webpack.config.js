// Stuff
const fs = require('fs');
const path = require('path');
// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');

const workDir = path.resolve(__dirname, 'public');

const listEntryes = () => {
    const temp = fs.readdirSync(workDir);
    return temp;
}

const configureEntries = (entries) => {
    const object = {
        shared: ['react', 'react-dom']
    };

    for (const _ of entries) {
        object[_] = `./${_}/${_}.tsx`;
    }

    return object;
}

module.exports = {
    mode: 'production',
    entry: configureEntries(listEntryes()),
    context: workDir,
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[name]/[name].js',
        path: path.resolve(__dirname, 'dist', 'view'),
    },
    plugins: [
        ...listEntryes().map((_) =>
            new HtmlWebpackPlugin({
                chunks: [_, 'shared'],
                filename: `${_}/${_}.html`,
                template: `${_}/${_}.html`,
                inject: "body",
                title: "Dna analyze tool!"
            })
        )
    ]
};