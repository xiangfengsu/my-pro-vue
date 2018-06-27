module.exports = {
    lintOnSave: false,
    devServer: {
        proxy:'http://118.190.154.11:3000/mock/7'
        // proxy: {
        //     "/": {
        //         target: "http://118.190.154.11:3000/"
        //     }
        // }
    }
}