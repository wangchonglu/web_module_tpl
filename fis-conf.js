/**
 * Created by zyc on 2016/6/27.
 */
fis.set('project.ignore', ["\..*", '.git/**', "README.md", "package.json", "npm-debug.log", 'fis-conf.js']);

fis.match('::packager', {
    postpackager: fis.plugin('loader')
});

fis.hook('cmd');

fis.match('/static/js/sea.js', {
    isMod: false
});

var commCss = [
    '/static/css/comm.css',
    '/modules/**.css'
];
var commJs = [
    "/static/js/sea.js",
    "/static/config/seaJS-config.js",
    "/static/config/config.js",
    "/static/js/seajs-text.js",
    "/static/js/jquery.min.js",
    "/static/js/director.js",
    '/app.js'
];

fis.media("dev")
    .match('::packager', {
        packager: fis.plugin('map', {
            '/static/all.css': commCss,
            '/static/all.js':commJs.concat([
                '/static/**.js',
                //'/modules/**.js'
            ])
        })
    })

fis.media("prod")
    .match('::packager', {
        packager: fis.plugin('map', {
            '/static/all.css': commCss,
            '/static/all.js':commJs.concat([
                '/static/**.js',
                '/modules/**.js'
            ])
        })
    })
    .match('**.js', {
        optimizer: fis.plugin('uglify-js', {
            drop_console: true
        })
    })
    .match('**.css', {
        optimizer: fis.plugin('clean-css')
    })
    .match('*.{js,css}', {
        useHash: true
    });