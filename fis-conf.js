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
    })


fis.hook('cmd');

fis.media("dev")
    .match('::packager', {
        packager: fis.plugin('map', {
            '/static/all.css': [
                '/static/css/comm.css',
                '/modules/**.css',
            ],
            '/static/all.js': [
                "/static/js/sea.js",
                "/static/config/seaJS-config.js",
                "/static/config/config.js",
                "/static/js/seajs-text.js",
                "/static/js/jquery.min.js",
                "/static/js/director.js",
                "/static/config/config.js",
                '/app.js',
                '/static/**.js',
                '/modules/**.js'
            ]
        })
    })
//.match('*.{js,css}', {
//    useHash: true
//});