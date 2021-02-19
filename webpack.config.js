module.exports = {
    module: {
      rules: [
        // ... other rules omitted
  
        // this will apply to both plain `.scss` files
        // AND `<style lang="scss">` blocks in `.vue` files
        {
          test: /\.scss$/,
          use: [
            'vue-style-loader',
            'css-loader',
            'sass-loader'
          ]
        }
        
      ],
 
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
  },
  plugins: [
    new webpack.ProvidePlugin({
        Vue: 'vue',
        'window.Vue': 'vue'
    })
]
  }