
// ref: https://umijs.org/config/
export default {
  define: {
    appName: 'thinkWeb',
    appFullName: 'thinkWeb'
  },
  proxy:{
    "/student":{
      target:"http://192.168.22.137:8089",
      changeOrigin: true,
      pathRewrite: { "^/student" : "" }
    }
  },
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: { webpackChunkName: true },
      title: 'thinkWeb',
      dll: true,
      locale: {
        enable: true,
        default: 'en-US',
      },
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  publicPath: './',
  history: 'browser',
  hash: true,
}
