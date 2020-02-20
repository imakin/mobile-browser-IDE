Node.prototype.appendChildSr = function(el) {
  this.appendChild(el);
  return el;
}
var ready = function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}
//querySelector shorthand
function elem(selector) {
    return document.querySelector(selector);
}
function elems(selector) {
    return document.querySelectorAll(selector);
}
//unwrap element tag but preserve innerHTML

function unwrap(selector) {
    var els = elems(selector);
    while (els.length) {
        var p = els[0].parentNode;
        while (els[0].firstChild) {
            p.insertBefore( els[0].firstChild, els[0] );
        }
        p.removeChild(els[0]);
}


var downloadString = function downloadString(filename, data) {
    var blob = new Blob([data], {type: 'text/plain'});
    if(window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, filename);
    }
    else{
        var elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;
        document.body.appendChild(elem);
        elem.click();
        document.body.removeChild(elem);
    }
}
/**
 * Creates a file upload dialog and returns text in promise
 * @returns {Promise<any>} param: text the string value of uploaded file
 */
function uploadText() {
    return new Promise(function (resolve) {
        // create file input
        const uploader = document.createElement('input')
        uploader.type = 'file'
        uploader.style.display = 'none'
        // listen for files
        uploader.addEventListener('change', function() {
            const files = uploader.files
            if (files.length) {
                const reader = new FileReader()
                reader.addEventListener('load', function() {
                    var filename = uploader.value;
                    global_filename = filename;
                    filename = filename.split('\\');
                    filename = filename[filename.length-1];
                    console.log(filename)
                    uploader.parentNode.removeChild(uploader)
                    resolve({'text':reader.result, 'filename':filename})
                })
                reader.readAsText(files[0])
            }
        })
        // trigger input
        document.body.appendChild(uploader)
        uploader.click()
    });
}
function cursor_position() {
    var sel = document.getSelection();
    sel.modify("extend", "backward", "paragraphboundary");
    var pos = sel.toString().length;
    if(sel.anchorNode != undefined) sel.collapseToEnd();
    return pos;
}
function write(text) {
    var sel, range;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            range.insertNode( document.createTextNode(text) );
        }
    } else if (document.selection && document.selection.createRange) {
        document.selection.createRange().text = text;
    }
}
function get_language() {
    try {
        var splitted = elem('#filename').value.split('.');
        return splitted[splitted.length-1];
    } catch(e) {
        return null;
    }
}
var marker;//instantiated in ready()
function highlight(){
    var lang = languages[get_language()];
    if (lang===undefined) {
        return false;
    }
    //reset marking
    var editor = elem('#editor');
    // editor.innerHTML = editor.innerHTML.replace(/\<\/?span.*\>/g, '');
    marker.markRegExp(lang.comment.oneline, {
        'element': 'span',
        'className': 'span-comment-'
    })
    marker.mark(lang.key[1], {
        'element': 'span',
        'className': 'span-highlight-1',
        'accuracy': {
            'value':'exactly',
            'limiters': settings.mark_limiter
        }
    });
    marker.mark(lang.key[2], {
        'element': 'span',
        'className': 'span-highlight-2',
        'accuracy': {
            'value':'exactly',
            'limiters': settings.mark_limiter
        }
    });
    var sel = document.getSelection();
    var node = sel.focusNode;
    var parent = node.parentNode;
    while (parent.id!=='editor') {
        node = parent;
        parent = node.parentNode;
    }
    //add enter because e.preventDefault called on Enter key listener
    document.execCommand('insertText', false, '\n');
    try {
        console.log(node.innerText)
        var indent = node.innerText.match(/^[\s\t]+/);
        if (indent && indent[0]!=='\n'){
            console.log('auto indent '+indent[0].length);
            // node.innerHTML += '<br/>'
            for (var i=0;i<indent[0].length;i++) {
                document.execCommand('insertText', false, ' ')
            }
        }
    } catch(e){throw e;}
    return;
}
function save(){
    downloadString(document.getElementById('filename').value, document.querySelector('#editor').innerText);
}
function open(){
    var editor = elem('#editor');
    uploadText().then(function(file) {
        var filename = file['filename']
        var text = file['text']
        elem('#filename').value = filename;
        editor.innerText = text;//.replace(/\s/g, '&nbsp;');
        text = editor.innerHTML.split(/<br\s*\/?>/).join('</div><div>');
        editor.innerHTML = text.replace(/\s/g, '&nbsp;');
        highlight();
    });
}
ready(function(){
    marker = new Mark(elem('#editor'));
    //events binding
    document.addEventListener("keydown", function(e) {
        var ctrl = (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey);
        for (var run_once=0;run_once==0;run_once++) {
            if (ctrl && e.key == 's') {
                save();
            }
            else if (ctrl && e.key == 'o') {
                open();
            }
            else {
                break;
            }
            e.preventDefault();
        }
    }, false);
    elem('#editor').addEventListener('keydown', function(e){
        if (e.key == 'Enter') {
            highlight();
            e.preventDefault();
        }
    }, false)
    elem('#button_open').addEventListener('click', function(ev){
        open();
    });
    elem('#button_save').addEventListener('click', function(ev){
        save();
    });
});