/**
 * Created by liushuai on 2018/1/13.
 */
/**
 * * Created by lizheng11
 * Date: 2017/7/26
 * editormd 为 editor.md 挂载的全局变量 https://pandao.github.io/editor.md/examples/index.html
 *
 * 使用方法在html中挂在三个标签
 * <link rel="stylesheet" href="https://s0.meituan.net/xm/open-platform-static/editormd/css/editormd.css" />
 * <script src="//s0.meituan.net/xm/static/jquery/1.11.3/jquery.min.js"></script>
 * <script src="https://s0.meituan.net/xm/open-platform-static/editormd/editormd.js"></script>
 */

'use strict';
import React, {Component} from 'react';
import assign from 'object-assign';

let defaultConfig = {
    // 组件接入方，并不需要知道具体ID
    id: 'EditorID' + new Date().getTime(),
    width: "100%",
    height: 740,
    // 静态资源路径
    path: './js/',

    codeFold: true,
    // syncScrolling : false,
    saveHTMLToTextarea: true,    // 保存 HTML 到 Textarea
    searchReplace: true,
    // watch : false,                // 关闭实时预览
    htmlDecode: "style,script,iframe|on*",            // 开启 HTML 标签解析，为了安全性，默认不开启
    // toolbar  : false,             //关闭工具栏
    // previewCodeHighlight : false, // 关闭预览 HTML 的代码块高亮，默认开启
    emoji: true,
    taskList: true,
    tocm: true,         // Using [TOCM]
    tex: true,                   // 开启科学公式TeX语言支持，默认关闭
    flowChart: true,             // 开启流程图支持，默认关闭
    sequenceDiagram: true,       // 开启时序/序列图支持，默认关闭,
    // dialogLockScreen : false,   // 设置弹出层对话框不锁屏，全局通用，默认为true
    // dialogShowMask : false,     // 设置弹出层对话框显示透明遮罩层，全局通用，默认为true
    // dialogDraggable : false,    // 设置弹出层对话框不可拖动，全局通用，默认为true
    // dialogMaskOpacity : 0.4,    // 设置透明遮罩层的透明度，全局通用，默认值为0.1
    // dialogMaskBgColor : "#000", // 设置透明遮罩层的背景颜色，全局通用，默认为#fff
    imageUpload: true,
    imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
    imageUploadURL: "./php/upload.php",
    onload: function(){}
};

class Editor extends Component {
    static defaultProps = {
        config: {}
    };

    componentDidMount(){
        let {config, onChange: changeValue, onSave, content} = this.props;
        config = assign({}, defaultConfig, config);
        // 静态资源地址修改
        if(config.path !== defaultConfig.path){
            console.warn('Editor warning: Static resource address has changed, if you know exactly what you\'re doing, ignore this warning');
        }
        let editor = editormd(config.id, {
            ...config,
            onload: function(){
                config.onload(editor, this);
            },
            onchange: function () {
                const markdown = this.getMarkdown();
                changeValue(markdown);
            },
            mySave: function () {
                onSave(0);
            }
        });
    }

    render(){
        let {config} = this.props;
        config = assign({}, defaultConfig, config);

        return (<div id={config.id}></div>);
    }
}

let defaultShowConfig = {
    id: 'EditorShowID' + new Date().getTime(),
    path: '//s0.meituan.net/xm/open-platform-static/editormd/lib/',
    gfm: true,
    toc: true,
    tocm: true,
    tocStartLevel: 1,
    tocTitle: '目录',
    tocDropdown: true,
    tocContainer: '',
    markdown: 'what can i do for you',
    markdownSourceCode: true,
    htmlDecode: true,
    autoLoadKaTeX: true,
    pageBreak: true,
    atLink: true,
    emailLink: true,
    tex: true,
    taskList: true,
    emoji: true,
    flowChart: true,
    sequenceDiagram: true,
    previewCodeHighlight: true,
    placeholder: 'start coding!!'
};

class EditorShow extends Component {
    static defaultProps = {
        config: {}
    };

    componentDidMount(){
        let {config} = this.props;
        config = assign({}, defaultShowConfig, config);

        let {
            id, gfm, toc, tocm, tocStartLevel, tocTitle, tocDropdown, tocContainer, markdown, markdownSourceCode,
            htmlDecode, autoLoadKaTeX, pageBreak, atLink, emailLink, tex, taskList, emoji, flowChart,
            sequenceDiagram, previewCodeHighlight, path
        } = config;
        consnole.log('llllllllłl1lllasdfadsf:' + markdown);

        this._init(path, function(){
            editormd.markdownToHTML(id, {
                gfm: gfm,
                toc: toc,
                tocm: tocm,
                tocStartLevel: tocStartLevel,
                tocTitle: tocTitle,
                tocDropdown: tocDropdown,
                tocContainer: tocContainer,
                markdown: markdown,
                markdownSourceCode: markdownSourceCode,
                htmlDecode: htmlDecode,
                autoLoadKaTeX: autoLoadKaTeX,
                pageBreak: pageBreak,
                atLink: atLink,    // for @link
                emailLink: emailLink,    // for mail address auto link
                tex: tex,
                taskList: taskList,   // Github Flavored Markdown task lists
                emoji: emoji,
                flowChart: flowChart,
                sequenceDiagram: sequenceDiagram,
                previewCodeHighlight: previewCodeHighlight
            });
        });

    }

    _init(path, cb){
        function createDom(str){
            return document.createElement(str);
        }

        var div = createDom('div');
        var id = 'EditorInitDom' + new Date().getTime();
        div.id = id;
        div.style.display = 'none';

        var textarea = createDom('textarea');
        div.appendChild(textarea);

        document.body.appendChild(div);
        // 加载静态资源，避免手动引入
        // Editor.md如果原生支持，就不用这样hack了
        editormd(id, {
            path: path,
            codeFold: true,
            saveHTMLToTextarea: true,    // 保存 HTML 到 Textarea
            searchReplace: true,
            htmlDecode: "style,script,iframe|on*",            // 开启 HTML 标签解析，为了安全性，默认不开启
            emoji: true,
            taskList: true,
            tocm: true,         // Using [TOCM]
            tex: true,                   // 开启科学公式TeX语言支持，默认关闭
            flowChart: true,             // 开启流程图支持，默认关闭
            sequenceDiagram: true,       // 开启时序/序列图支持，默认关闭,
            imageUpload: true,
            imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"]
        });

        // 检测静态资源是否加载完毕
        var timer = setInterval(function(){
            try{
                if(_ && Diagram && flowchart){
                    clearInterval(timer);
                    document.body.removeChild(div);

                    cb();
                }
            }catch(e){
            }
        }, 100);
    }

    render(){
        let {config} = this.props;
        config = assign({}, defaultShowConfig, config);

        let {id} = config;
        return (
            <div id={id}/>
        );
    }
}

Editor.EditorShow = EditorShow;
export default Editor;