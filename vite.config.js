const { join,resolve } = require('path')
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import svgSprite from 'vite-plugin-svg-sprite'

// https://vitejs.dev/config/
export default ({ command, mode }) => {
  if (command === 'serve') {
    console.log('is serve')
  } else {
    console.log('is build')
  }
  return defineConfig({
    base: '',
    resolve: {
      extensions: [".js", ".vue", ".json"],
      alias: {
        "@": join(__dirname, "/src"),
      },
    },
    build: {
      outDir: 'dist/web',
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          message: resolve(__dirname, 'message/index.html')
        }
      }
    },
    server: {
      port: 9527,
      open: true,
      /*proxy: {
        "/api": {
          target: "http://devops.copote.com/dev",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },*/
    },
    plugins: [
      vue(),
      legacy({
        targets: ["defaults", "ie 10"],
      }),
      svgSprite({
        include: "**/icons/svg/*.svg",
      }),
    ],

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "src/assets/css/define.scss";`,
        },
      },
    },
  });
}
