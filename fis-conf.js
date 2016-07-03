/**
 * Created by zyc on 2016/6/27.
 */
fis.set('project.ignore', ["\..*", '.git/**', "README.md", "package.json", "npm-debug.log", 'fis-conf.js']);

fis.match('::packager', {
    postpackager: fis.plugin('loader')
});

fis.match('/static/js/sea.js', {
        isMod: false
    })
    .match('/static/js/seajs-text.js', {
        isMod: false
    });

//fis插件 支持模块化开发
fis.hook('cmd');

fis.media("dev")
    .match('::packager', {
        packager: fis.plugin('map', {   //css
            '/static/all.css': [
                '/static/css/comm.css',
                '/modules/**.css'
            ],
            '/static/all.js': [   //打包
                "/static/js/sea.js",
                "/static/config/seaJS-config.js",//sea.js简单配置
                "/static/config/config.js",//相关的全局配置
                "/static/js/seajs-text.js", //sea.js插件
                "/static/js/jquery.min.js",//类库
                "/static/js/director.js", //路由
                "/static/config/config.js",//???
                '/app.js',
                '/static/**.js',//
                '/modules/**.js'
            ]
        })
    });
//.match('*.{js,css}', {
//    useHash: true
//});