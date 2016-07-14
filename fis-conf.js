/**
 * Created by zyc on 2016/6/27.
 */
//设置不打包文件
fis.set('project.ignore', ["\..*", '.git/**', "README.md", "package.json", "npm-debug.log", 'fis-conf.js']);

//加载loader插件
fis.match('::packager', {
    postpackager: fis.plugin('loader')
});

fis.match('*.scss', {
    // fis-parser-less 插件进行解析
    parser: fis.plugin('scss'),
    // .less 文件后缀构建后被改成 .css 文件
    rExt: '.css'
})

//加载方式 cmd同步加载  amd异步加载
fis.hook('cmd');

//非模块的文件
fis.match('/static/js/sea.js', {
    isMod: false
});

//公用部分
var commCss = [
    '/static/css/comm.css',
    '/modules/**.css',
    '/modules/**.scss'
];
var commJs = [
    "/static/js/sea.js",
    "/static/config/seaJS-config.js",
    "/static/js/swiper.3.2.0.min.js",
    "/static/config/config.js",
    "/static/js/seajs-text.js",
    "/static/js/jquery.min.js",
    "/static/js/director.js",
    '/app.js'
];

//开发环境
fis.media("dev")
    .match('::packager', {
        packager: fis.plugin('map', {
            '/static/all.css': commCss,
            '/static/all.js': commJs.concat([
                '/static/**.js',
                //'/modules/**.js'
            ])
        })
    });

//线上环境
fis.media("prod")
    .match('::packager', {
        packager: fis.plugin('map', {
            '/static/all.css': commCss,
            '/static/all.js': commJs.concat([
                '/static/**.js',
                '/modules/**.js'
            ])
        })
    })
    //压缩js  css
    .match('**.js', {
        optimizer: fis.plugin('uglify-js', {
            drop_console: true
        })
    })
    .match('**.css', {
        optimizer: fis.plugin('clean-css')
    })
    //添加版本号
    .match('*.{js,css}', {
        useHash: true
    });