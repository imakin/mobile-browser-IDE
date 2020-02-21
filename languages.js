var settings = {
    //default font color in all.scss
    mark_limiter: [',', '.', '(', ')', '[', ']', '{','}', ';', ':']
}
var languages = {
    "py": {
        "name":"python",
        "key": {
            1:[//key1
                "False", "None", "True", "and", "as", "assert", "async", "await",
                "break", "class", "continue", "def", "del", "elif", "else",
                "except", "exec", "finally", "for", "from", "global", "if",
                "import", "in", "is", "lambda", "nonlocal", "not", "or", "pass",
                "print", "raise", "return", "try", "while", "with", "yield"
            ],
            2:[
                "ArithmeticError", "AssertionError", "AttributeError",
                "BaseException", "BlockingIOError", "BrokenPipeError",
                "BufferError", "BytesWarning", "ChildProcessError",
                "ConnectionAbortedError", "ConnectionError", "ConnectionRefusedError",
                "ConnectionResetError", "DeprecationWarning", "EOFError",
                "Ellipsis", "EnvironmentError", "Exception", "FileExistsError",
                "FileNotFoundError", "FloatingPointError", "FutureWarning",
                "GeneratorExit", "IOError", "ImportError", "ImportWarning",
                "IndentationError", "IndexError", "InterruptedError",
                "IsADirectoryError", "KeyError", "KeyboardInterrupt",
                "LookupError", "MemoryError", "ModuleNotFoundError", "NameError",
                "NotADirectoryError", "NotImplemented", "NotImplementedError",
                "OSError", "OverflowError", "PendingDeprecationWarning",
                "PermissionError", "ProcessLookupError", "RecursionError",
                "ReferenceError", "ResourceWarning", "RuntimeError", "RuntimeWarning",
                "StandardError", "StopAsyncIteration", "StopIteration", "SyntaxError",
                "SyntaxWarning", "SystemError", "SystemExit", "TabError",
                "TimeoutError", "TypeError", "UnboundLocalError", "UnicodeDecodeError",
                "UnicodeEncodeError", "UnicodeError", "UnicodeTranslateError",
                "UnicodeWarning", "UserWarning", "ValueError", "Warning",
                "ZeroDivisionError", "__build_class__", "__debug__", "__doc__",
                "__import__", "__loader__", "__name__", "__package__", "__spec__",
                "abs", "all", "any", "apply", "ascii", "basestring", "bin", "bool",
                "breakpoint", "buffer", "bytearray", "bytes", "callable", "chr",
                "classmethod", "cmp", "coerce", "compile", "complex", "copyright",
                "credits", "delattr", "dict", "dir", "divmod", "enumerate", "eval",
                "execfile", "exit", "file", "filter", "float", "format", "frozenset",
                "getattr", "globals", "hasattr", "hash", "help", "hex", "id", "input",
                "int", "intern", "isinstance", "issubclass", "iter", "len", "license",
                "list", "locals", "long", "map", "max", "memoryview", "min", "next",
                "object", "oct", "open", "ord", "pow", "property", "quit", "range",
                "raw_input", "reduce", "reload", "repr", "reversed", "round", "set",
                "setattr", "slice", "sorted", "staticmethod", "str", "sum", "super",
                "tuple", "type", "unichr", "unicode", "vars", "xrange", "zip"
            ],//key2
        },
        "comment":{
            'oneline': /\#/,
            'multiline_open': ['"""'],
            'multiline_close': ['"""']
        }
    },
    "js, html": {
        "name": "javascript and html",
        "key": {
            1:[
                "break", "case", "catch", "class", "const", "continue", "debugger",
                "default", "delete", "do", "else", "enum", "export", "extends",
                "false", "finally", "for", "function", "get", "if", "import",
                "in", "Infinity", "instanceof", "let", "NaN", "new", "null",
                "return", "set", "static", "super", "switch", "this", "throw",
                "true", "try", "typeof", "undefined", "var", "void", "while",
                "with", "yield", "prototype", "async", "await"
            ],
            2:[
                "Array", "Boolean", "Date", "Function", "Math", "Number",
                "Object", "String", "RegExp", "EvalError", "Error", "RangeError",
                "ReferenceError", "SyntaxError", "TypeError", "URIError",
                "constructor", "prototype", "decodeURI", "decodeURIComponent",
                "encodeURI", "encodeURIComponent", "eval", "isFinite", "isNaN",
                "parseFloat", "parseInt"
            ]
        },
        "comment":{
            'oneline': /^(?!.*\:\/\/.*$).*\/\/.*$/, //comment without leading :// to avoid https:// etc
            'multiline_open': ['/*', '<!--'],
            'multiline_close': ['*/', '-->']
        }
    },
}

//all the alias extension
for (key in languages) {
    var splitted = key.split(',');
    if (splitted.length>1) {
        var value = languages[key];
        for (var i=0;i<splitted.length;i++) {
            languages[splitted[i].trim()] = value;
        }
    }
}
