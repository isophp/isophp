/**
 * Created by liushuai on 2018/2/28.
 */
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

UIkit.use(Icons);
UIkit.notification('Hello world!!!!!!!!');

document.onclick = e => import(/* webpackChunkName: "print" */'./components/test-lazyload').then(module=>{
    var print = module.default;
    print('index require article');
});