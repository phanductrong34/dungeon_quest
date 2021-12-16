/*
INJECT DATA VÀO TỪ ĐẦU CÁI FILE SCSS MAIN
*/



module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/styles/main.scss";'
          //cũng đc chuyển thành html sẽ nhận đc tác dụng của cái file main ấy
      }
    }
  },

  assetsDir: 'assets'
};