/**
 * Created by liushuai on 2018/2/28.
 */
import '../css/index.less';
UIkit.use(UIkitIcons);
UIkit.notification('Hello world!!!!!!!!');

document.onclick = e => import(/* webpackChunkName: "print" */'./components/test-lazyload').then(module=>{
    var print = module.default;
    print('index require article');
});