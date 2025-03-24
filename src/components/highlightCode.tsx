import { useEffect, useMemo, useRef, useState } from "react";

const darkTheme = {
    container: {
        display: "flex",
        backgroundColor: "#111111",
        color: "#FFFFFF",
        fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
        borderRadius: "8px",
        padding: "10px",
        overflowX: "auto",
        width: "100%",
        height: "100%"
    },
    html: {
        string: { color: "rgb(245, 192, 112)" },
        function: { color: "rgb(255, 223, 82)" },
        parentheses: { color: "rgb(188, 252, 255)" },
        operator: { color: "rgb(170, 139, 255)" },
        tagName: { color: "rgb(170, 139, 255)" },
        comment: { color: "rgb(144, 144, 144)" },
        php_variable: { color: "rgb(166, 211, 255)" }
    },
    ts: {
        keyword: { color: "rgb(35, 145, 255)" },
        function: { color: "rgb(255, 223, 82)" },
        class: { color: "rgb(107, 255, 225)" },
        type: { color: "rgb(117, 252, 173)" },
        string: { color: "rgb(245, 192, 112)" },
        number: { color: "rgb(255, 140, 0)" },
        comment: { color: "rgb(144, 144, 144)" },
        operator: { color: "rgb(255, 121, 121)" },
        parentheses: { color: "rgb(255, 233, 168)" },
        brackets: { color: "rgb(201, 254, 128)" },
        braces: { color: "rgb(255, 136, 237)" }
    },
    css: {
        function: { color: "rgb(255, 223, 82)" },
        string: { color: "rgb(245, 192, 112)" },
        number: { color: "rgb(255, 140, 0)" },
        comment: { color: "rgb(144, 144, 144)" },
        parentheses: { color: "rgb(255, 233, 168)" },
        brackets: { color: "rgb(201, 254, 128)" },
        braces: { color: "rgb(255, 136, 237)" },
        selector: { color: "rgb(255, 203, 168)" },
        value: { color: "rgb(230, 142, 99)" }
    }
};

const lightTheme = {
    container: {
        display: "flex",
        backgroundColor: "rgb(207, 207, 207)",
        color: "rgb(0, 0, 0)",
        fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
        borderRadius: "8px",
        padding: "10px",
        overflowX: "auto",
        width: "100%",
        height: "100%"
    },
    html: {
        string: { color: "rgb(127, 74, 31)" },
        function: { color: "rgb(138, 107, 18)" },
        parentheses: { color: "rgb(29, 109, 140)" },
        operator: { color: "rgb(23, 77, 143)" },
        tagName: { color: "rgb(23, 77, 143)" },
        comment: { color: "rgb(96, 96, 96)" },
        php_variable: { color: "rgb(44, 111, 191)" }
    },
    ts: {
        keyword: { color: "rgb(61, 0, 128)" },
        function: { color: "rgb(138, 107, 18)" },
        class: { color: "rgb(0, 102, 0)" },
        type: { color: "rgb(0, 128, 0)" },
        string: { color: "rgb(111, 111, 0)" },
        number: { color: "rgb(102, 26, 26)" },
        comment: { color: "rgb(96, 96, 96)" },
        operator: { color: "rgb(138, 0, 0)" },
        parentheses: { color: "rgb(102, 67, 42)" },
        brackets: { color: "rgb(72, 102, 41)" },
        braces: { color: "rgb(42, 95, 95)" }
    },
    css: {
        function: { color: "rgb(138, 107, 18)" },
        string: { color: "rgb(127, 74, 31)" },
        number: { color: "rgb(153, 61, 0)" },
        comment: { color: "rgb(96, 96, 96)" },
        parentheses: { color: "rgb(138, 115, 81)" },
        brackets: { color: "rgb(120, 147, 61)" },
        braces: { color: "rgb(138, 48, 133)" },
        selector: { color: "rgb(138, 115, 81)" },
        value: { color: "rgb(153, 53, 36)" }
    }
};

/**
 * Theme Interface
 * 
 * This interface defines the structure of a theme object used for syntax highlighting. 
 * Each section represents a specific language (HTML, TypeScript, CSS), 
 * and the colors for each element in that language are defined through color keys.
 * 
 * @interface Theme
 */
export interface Theme {
    /**
     * General configuration for the container, including background, text color, font, and size.
     */
    container: {
        display: string, // The CSS value for the display property (e.g., "flex").
        backgroundColor: string, // The background color of the container (in hexadecimal or rgb format).
        color: string, // The text color in the container (in hexadecimal or rgb format).
        fontFamily: string, // The font family used in the container.
        borderRadius: string, // The border radius (e.g., "8px").
        padding: string, // The padding inside the container (e.g., "10px").
        overflowX: string, // The overflow property for the X-axis (e.g., "auto").
        width: string, // The width of the container (e.g., "100%" or "500px").
        height: string // The height of the container (e.g., "100%" or "300px").
    },

    /**
     * Colors used for syntax highlighting in HTML elements.
     */
    html: {
        string: { color: string }, // The color for string literals in HTML (e.g., warm brown).
        function: { color: string }, // The color for functions in HTML (e.g., lighter gold).
        parentheses: { color: string }, // The color for parentheses in HTML (e.g., vibrant blue).
        operator: { color: string }, // The color for operators in HTML (e.g., intense blue).
        tagName: { color: string }, // The color for tag names in HTML (similar to operators, intense blue).
        comment: { color: string }, // The color for comments in HTML (neutral gray).
        php_variable: { color: string } // The color for PHP variables in HTML (bright blue).
    },

    /**
     * Colors used for syntax highlighting in TypeScript elements.
     */
    ts: {
        keyword: { color: string }, // The color for keywords in TypeScript (e.g., darker purple).
        function: { color: string }, // The color for functions in TypeScript (e.g., lighter gold).
        class: { color: string }, // The color for classes in TypeScript (e.g., vibrant green).
        type: { color: string }, // The color for types in TypeScript (e.g., bright green).
        string: { color: string }, // The color for string literals in TypeScript (e.g., dark yellow).
        number: { color: string }, // The color for numbers in TypeScript (e.g., warm red).
        comment: { color: string }, // The color for comments in TypeScript (dark gray).
        operator: { color: string }, // The color for operators in TypeScript (vibrant red).
        parentheses: { color: string }, // The color for parentheses in TypeScript (lighter brown).
        brackets: { color: string }, // The color for brackets in TypeScript (olive green).
        braces: { color: string } // The color for braces in TypeScript (bluish green).
    },

    /**
     * Colors used for syntax highlighting in CSS elements.
     */
    css: {
        function: { color: string }, // The color for functions in CSS (e.g., lighter gold).
        string: { color: string }, // The color for string literals in CSS (e.g., warm brown).
        number: { color: string }, // The color for numbers in CSS (e.g., soft orange).
        comment: { color: string }, // The color for comments in CSS (neutral gray).
        parentheses: { color: string }, // The color for parentheses in CSS (light beige).
        brackets: { color: string }, // The color for brackets in CSS (light green).
        braces: { color: string }, // The color for braces in CSS (softer purple).
        selector: { color: string }, // The color for selectors in CSS (similar to parentheses, light beige).
        value: { color: string } // The color for values in CSS (warm red-orange).
    }
}


class HighlightCodeClass {

    defaultThemeType: string;
    defaultTheme: Theme;
    suffix: string;

    constructor(defaultThemeType = "light", suffix = "") {
        console.log("constructor");
        this.suffix = suffix
        this.defaultThemeType = defaultThemeType;
        if (this.defaultThemeType == "dark") {
            this.defaultTheme = darkTheme;
        } else if (this.defaultThemeType == "light") {
            this.defaultTheme = lightTheme;
        } else {
            this.defaultTheme = lightTheme;
            console.warn(`The HighlightCode defaultThemeType parameter can only be 'light' or 'dark'.
It is set to 'light' automatically because no value has been entered or the entered value is invalid.`)
        }
    }
    sanitizeHtmlTags(str: string) {
        return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
    setDefaultTheme(theme: any) {
        this.defaultTheme = theme;
    }
    async jsTheme(style = this.defaultTheme.ts) {
        this.tsTheme(style);
    }
    async tsTheme(style = this.defaultTheme.ts) {

        if (Object.hasOwn(style, 'keyword')) {
            const elements = document.querySelectorAll('.hlc_ts_keyword' + this.suffix);
            elements.forEach(element => {
                if (element instanceof HTMLElement) {
                    Object.assign(element.style, style.keyword);
                }
            });
        }
        if (Object.hasOwn(style, 'function')) {
            const elements = document.querySelectorAll('.hlc_ts_function' + this.suffix);
            elements.forEach(element => {
                if (element instanceof HTMLElement) {
                    Object.assign(element.style, style.function);
                }
            });
        }
        if (Object.hasOwn(style, 'class')) {
            const elements = document.querySelectorAll('.hlc_ts_class' + this.suffix);
            elements.forEach(element => {
                if (element instanceof HTMLElement) {
                    Object.assign(element.style, style.class);
                }
            });
        }
        if (Object.hasOwn(style, 'type')) {
            const elements = document.querySelectorAll('.hlc_ts_type' + this.suffix);
            elements.forEach(element => {
                if (element instanceof HTMLElement) {
                    Object.assign(element.style, style.type);
                }
            });
        }
        if (Object.hasOwn(style, 'string')) {
            const elements = document.querySelectorAll('.hlc_ts_string' + this.suffix);
            elements.forEach(element => {
                if (element instanceof HTMLElement) {
                    Object.assign(element.style, style.string);
                }
            });
        }
        if (Object.hasOwn(style, 'number')) {
            const elements = document.querySelectorAll('.hlc_ts_number' + this.suffix);
            elements.forEach(element => {
                if (element instanceof HTMLElement) {
                    Object.assign(element.style, style.number);
                }
            });
        }
        if (Object.hasOwn(style, 'comment')) {
            const elements = document.querySelectorAll('.hlc_ts_comment' + this.suffix);
            elements.forEach(element => {
                if (element instanceof HTMLElement) {
                    Object.assign(element.style, style.comment);
                }
            });
        }
        if (Object.hasOwn(style, 'operator')) {
            const elements = document.querySelectorAll('.hlc_ts_operator' + this.suffix);
            elements.forEach(element => {
                if (element instanceof HTMLElement) {
                    Object.assign(element.style, style.operator);
                }
            });
        }
        if (Object.hasOwn(style, 'parentheses')) {
            const elements = document.querySelectorAll('.hlc_ts_parentheses' + this.suffix);
            elements.forEach(element => {
                if (element instanceof HTMLElement) {
                    Object.assign(element.style, style.parentheses);
                }
            });
        }
        if (Object.hasOwn(style, 'brackets')) {
            const elements = document.querySelectorAll('.hlc_ts_brackets' + this.suffix);
            elements.forEach(element => {
                if (element instanceof HTMLElement) {
                    Object.assign(element.style, style.brackets);
                }
            });
        }
        if (Object.hasOwn(style, 'braces')) {
            const elements = document.querySelectorAll('.hlc_ts_braces' + this.suffix);
            elements.forEach(element => {
                if (element instanceof HTMLElement) {
                    Object.assign(element.style, style.braces);
                }
            });
        }
    }
    async cssTheme(style = this.defaultTheme.css) {
        if (Object.hasOwn(style, 'function')) {
            const elements = document.querySelectorAll('.hlc_css_function' + this.suffix);
            elements.forEach(element => {
                if (element instanceof HTMLElement) {
                    Object.assign(element.style, style.function);
                }
            });
        }
        if (Object.hasOwn(style, 'string')) {
            const elements = document.querySelectorAll('.hlc_css_string' + this.suffix);
            elements.forEach(element => {
                if (element instanceof HTMLElement) {
                    Object.assign(element.style, style.string);
                }
            });
        }
        if (Object.hasOwn(style, 'number')) {
            const elements = document.querySelectorAll('.hlc_css_number' + this.suffix);
            elements.forEach(element => {
                if (element instanceof HTMLElement) {
                    Object.assign(element.style, style.number);
                }
            });
        }
        if (Object.hasOwn(style, 'comment')) {
            const elements = document.querySelectorAll('.hlc_css_comment' + this.suffix);
            elements.forEach(element => {
                if (element instanceof HTMLElement) {
                    Object.assign(element.style, style.comment);
                }
            });
        }
        if (Object.hasOwn(style, 'parentheses')) {
            const elements = document.querySelectorAll('.hlc_css_parentheses' + this.suffix);
            elements.forEach(element => {
                if (element instanceof HTMLElement) {
                    Object.assign(element.style, style.parentheses);
                }
            });
        }
        if (Object.hasOwn(style, 'brackets')) {
            const elements = document.querySelectorAll('.hlc_css_brackets' + this.suffix);
            elements.forEach(element => {
                if (element instanceof HTMLElement) {
                    Object.assign(element.style, style.brackets);
                }
            });
        }
        if (Object.hasOwn(style, 'braces')) {
            const elements = document.querySelectorAll('.hlc_css_braces' + this.suffix);
            elements.forEach(element => {
                if (element instanceof HTMLElement) {
                    Object.assign(element.style, style.braces);
                }
            });
        }
        if (Object.hasOwn(style, 'selector')) {
            const elements = document.querySelectorAll('.hlc_css_selector' + this.suffix);
            elements.forEach(element => {
                if (element instanceof HTMLElement) {
                    Object.assign(element.style, style.selector);
                }
            });
        }
        if (Object.hasOwn(style, 'value')) {
            const elements = document.querySelectorAll('.hlc_css_value' + this.suffix);
            elements.forEach(element => {
                if (element instanceof HTMLElement) {
                    Object.assign(element.style, style.value);
                }
            });
        }
    }
    async phpTheme(style = this.defaultTheme.html) {
        this.htmlTheme(style);
    }
    async htmlTheme(style = this.defaultTheme.html) {
        if (Object.hasOwn(style, 'function')) {
            const elements = document.querySelectorAll('.hlc_html_function' + this.suffix);
            elements.forEach(element => {
                if (element instanceof HTMLElement) {
                    Object.assign(element.style, style.function);
                }
            });
        }
        if (Object.hasOwn(style, 'string')) {
            const elements = document.querySelectorAll('.hlc_html_string' + this.suffix);
            elements.forEach(element => {
                if (element instanceof HTMLElement) {
                    Object.assign(element.style, style.string);
                }
            });
        }
        if (Object.hasOwn(style, 'parentheses')) {
            const elements = document.querySelectorAll('.hlc_html_parentheses' + this.suffix);
            elements.forEach(element => {
                if (element instanceof HTMLElement) {
                    Object.assign(element.style, style.parentheses);
                }
            });
        }
        if (Object.hasOwn(style, 'operator')) {
            const elements = document.querySelectorAll('.hlc_html_operator' + this.suffix);
            elements.forEach(element => {
                if (element instanceof HTMLElement) {
                    Object.assign(element.style, style.operator);
                }
            });
        }
        if (Object.hasOwn(style, 'tagName')) {
            const elements = document.querySelectorAll('.hlc_html_tag' + this.suffix);
            elements.forEach(element => {
                if (element instanceof HTMLElement) {
                    Object.assign(element.style, style.tagName);
                }
            });
        }
        if (Object.hasOwn(style, 'comment')) {
            const elements = document.querySelectorAll('.hlc_html_comment' + this.suffix);
            elements.forEach(element => {
                if (element instanceof HTMLElement) {
                    Object.assign(element.style, style.comment);
                }
            });
        }
        if (Object.hasOwn(style, 'php_variable')) {
            const elements = document.querySelectorAll('.hlc_php_variable' + this.suffix);
            elements.forEach(element => {
                if (element instanceof HTMLElement) {
                    Object.assign(element.style, style.php_variable);
                }
            });
        }
    }
    async php(code: string) {
        return await this.html(code);
    }
    async html(code: string) {
        const operatorArray: string[] = [];
        const tagArray: string[] = [];
        const cssCommentArray: string[] = [];
        const htmlCommentArray: string[] = [];
        const styleTextArray: string[] = [];
        const scriptTextArray: string[] = [];
        const phpVariableArray: string[] = [];
        const php_variables = /\$\w+\b/g;
        const phpVariable = /___phpvariable___/
        const styleText = /(?<=<style>)[\s\S]*?(?=<\/style>)/gm;
        const styleFlag = /___htmlstyle___/;
        const scriptText = /(?<=<script>)[\s\S]*?(?=<\/script>)/gm;
        const scriptFlag = /___htmlscript___/;
        const html_functions = /(?<=\.?)\w+\s*(?=\()/g
        const html_strings = /(?<!>)(['"`])(?:(?!\1)[^\\]|\\.)*\1(?!<)/g;
        const css_comments = /(\/\*[\s\S]*?\*\/)/g;
        const cssComment = /___csscomment___/;
        const html_comments = /(<!--[\s\S]*?-->)|(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g // /(<!--[\s\S]*?-->)/g;
        const htmlComment = /___htmlcomment___/;
        const html_operators = /([<>]|\?>)/g
        const html_tag = /(?<=<)([^>\s]+)(?=\s|>)/g
        const tag = /___tag___/;
        const operator = /___operator___/;
        const html_parentheses = /[\(\)\[\]\{\}]/g;

        code = code.replace(styleText, function (match) {
            styleTextArray.push(match);
            return "___htmlstyle___"
        })
        code = code.replace(scriptText, function (match) {
            scriptTextArray.push(match);
            return "___htmlscript___"
        })
        code = code.replace(html_comments, function (group1) {
            htmlCommentArray.push(group1);
            return "___htmlcomment___"
        })
        code = code.replace(css_comments, function (group1) {
            cssCommentArray.push(group1);
            return "___csscomment___"
        })
        code = code.replace(html_tag, function (match) {
            tagArray.push(match);
            return "___tag___"
        });
        code = code.replace(php_variables, function (match) {
            phpVariableArray.push(match);
            return "___phpvariable___"
        })
        code = code.replace(html_operators, function (match) {
            operatorArray.push(match);
            return "___operator___"
        })
        code = this.sanitizeHtmlTags(code)
            .replace(html_strings, `<span class="hlc_html_string${this.suffix}">$&</span>`)
            .replace(html_functions, `<span class="hlc_html_function${this.suffix}">$&</span>`)
            .replace(html_parentheses, `<span class="hlc_html_parentheses${this.suffix}">$&</span>`)
        for (let i = 0; i < phpVariableArray.length; i++) {
            code = code.replace(phpVariable, `<span class='hlc_php_variable${this.suffix}'>` + phpVariableArray[i] + `</span>`);
        }
        for (let i = 0; i < operatorArray.length; i++) {
            code = code.replace(operator, `<span class='hlc_html_operator${this.suffix}'>` + operatorArray[i] + `</span>`);
        }
        for (let i = 0; i < tagArray.length; i++) {
            code = code.replace(tag, `<span class='hlc_html_tag${this.suffix}'>` + tagArray[i] + `</span>`);
        }
        for (let i = 0; i < cssCommentArray.length; i++) {
            code = code.replace(cssComment, `<span class='hlc_css_comment${this.suffix}'>` + cssCommentArray[i] + `</span>`);
        }
        for (let i = 0; i < htmlCommentArray.length; i++) {
            code = code.replace(htmlComment, `<span class='hlc_html_comment${this.suffix}'>` + this.sanitizeHtmlTags(htmlCommentArray[i]) + `</span>`);
        }
        for (let i = 0; i < scriptTextArray.length; i++) {
            const txt = await this.ts(scriptTextArray[i])
            console.log(txt);
            code = code.replace(scriptFlag, txt);
        }
        for (let i = 0; i < styleTextArray.length; i++) {
            code = code.replace(styleFlag, await this.css(styleTextArray[i]));
        }
        return code;
    }
    async js(code: string) {
        return this.ts(code);
    }
    async ts(code: string) {
        const commentArray: string[] = [];
        const operatorArray: string[] = [];
        const classWordArray: string[] = [];
        const classNameArray: string[] = [];
        const stringArray: string[] = [];

        const ts_class_word = /\b(class)\b/g;
        const class_word = /___class___/;
        const ts_class_name = /(?<=class\s+)(\S+)(?=\s*\b)/g;
        const class_name = /___className___/
        const ts_functions = /(?<=\.?)\w+\s*(?=\()/g
        const ts_classes = /\b(Array|String|Number|Boolean|Object|Function|Symbol|Date|RegExp|Promise|Set|Map|WeakSet|WeakMap|Error|TypeError|SyntaxError|ReferenceError|RangeError|EvalError|URIError|Math|JSON)\b/g;
        const ts_keywords = /(?<!>)\b(as|function|return|let|const|var|if|else|for|while|do|switch|case|break|default|throw|try|catch|finally|new|extends|this|import|export|from|super|typeof|instanceof|void|yield|async|await|delete|in|of|with|debugger|continue|enum|implements|interface|public|private|protected|abstract|readonly|static|namespace|declare|keyof|infer)\b(?!<)/g;
        const ts_types = /(?<=\:\s*)(any|boolean|number|string|symbol|undefined|null|object|true|false|unknown|never|void)\b/g;
        const ts_numbers = /\b\d+\b/g;
        const ts_strings = /(?<!>)(['"`])(?:(?!\1)[^\\]|\\.)*\1(?!<)/g;
        const _string = /___strin_g___/;
        const ts_comments = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g;
        const comment = /___comment___/;
        const ts_operators = /([<>*=&+\-%!|])/g;
        const operator = /___operator___/;
        const ts_parentheses = /[\(\)]/g;
        const ts_brackets = /[\[\]]/g;
        const ts_braces = /[\{\}]/g;

        //code = this.sanitizeHtmlTags(code);
        code = code.replace(ts_strings, function (match) {
            stringArray.push(match);
            return "___strin_g___"
        })
        code = code.replace(ts_comments, function (group1) {
            commentArray.push(group1);
            return "___comment___"
        })

        code = code.replace(ts_operators, function (match) {
            operatorArray.push(match);
            return "___operator___"
        })
        code = code.replace(ts_class_name, function (match) {
            classNameArray.push(match);
            return "___className___"
        })
        let classNameRegExp;
        if (classNameArray.length > 0) {
            let classNamePreER = "\\b(";
            for (let i = 0; i < classNameArray.length; i++) {
                classNamePreER += classNameArray[i];
                if (i != classNameArray.length - 1) {
                    classNamePreER += "|";
                }
            }
            classNamePreER += ")\\b";
            classNameRegExp = new RegExp(classNamePreER, "g");
        } else {
            classNameRegExp = /^$a/;
        }
        code = code.replace(classNameRegExp, function (match) {
            classNameArray.push(match);
            return "___className___"
        })

        code = code.replace(ts_class_word, function (match) {
            classWordArray.push(match);
            return "___class___"
        })
        code = code.replace(ts_types, `<span class="hlc_ts_type${this.suffix}">$1</span>`)
            .replace(ts_keywords, `<span class="hlc_ts_keyword${this.suffix}">$1</span>`)
            .replace(ts_functions, `<span class="hlc_ts_function${this.suffix}">$&</span>`)
            .replace(ts_classes, `<span class="hlc_ts_class${this.suffix}">$1</span>`)
            .replace(ts_numbers, `<span class="hlc_ts_number${this.suffix}">$&</span>`)
            .replace(ts_parentheses, `<span class="hlc_ts_parentheses${this.suffix}">$&</span>`)
            .replace(ts_brackets, `<span class="hlc_ts_brackets${this.suffix}">$&</span>`)
            .replace(ts_braces, `<span class="hlc_ts_braces${this.suffix}">$&</span>`)
        for (let i = 0; i < stringArray.length; i++) {
            code = code.replace(_string, `<span class='hlc_ts_string${this.suffix}'>` + stringArray[i] + `</span>`);
        }
        for (let i = 0; i < commentArray.length; i++) {
            code = code.replace(comment, `<span class='hlc_ts_comment${this.suffix}'>` + commentArray[i] + `</span>`);
        }
        for (let i = 0; i < operatorArray.length; i++) {
            code = code.replace(operator, `<span class='hlc_ts_operator${this.suffix}'>` + operatorArray[i] + `</span>`);
        }
        for (let i = 0; i < classWordArray.length; i++) {
            code = code.replace(class_word, `<span class='hlc_ts_keyword${this.suffix}'>` + classWordArray[i] + `</span>`);
        }
        for (let i = 0; i < classNameArray.length; i++) {
            code = code.replace(class_name, `<span class='hlc_ts_class${this.suffix}'>` + classNameArray[i] + `</span>`);
        }
        return code;
    }
    async css(code: string) {
        const commentArray: string[] = [];
        const selectorArray: string[] = [];
        const valueArray: string[] = [];
        const stringArray: string[] = [];
        const css_selectors = /^.*?(?=\{)/gm;
        const selector = /___selector___/;
        const css_values = /(?<=:)(.*?)(?=;)/g;
        const value = /___value___/;
        const css_functions = /(?<=\.?)\w+\s*(?=\()/g;
        const css_numbers = /\b\d+\b/g;
        const css_strings = /(?<!>)(['"`])(?:(?!\1)[^\\]|\\.)*\1(?!<)/g;
        const string = /___string___/
        const css_comments = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g;
        const comment = /___comment___/;
        const css_parentheses = /[\(\)]/g;
        const css_brackets = /[\[\]]/g;
        const css_braces = /[\{\}]/g;

        code = code.replace(css_comments, function (group1) {
            commentArray.push(group1);
            return "___comment___ "
        })
        code = code.replace(css_strings, function (match) {
            stringArray.push(match);
            return "___string___ "
        })

        code = code.replace(css_selectors, function (match) {
            selectorArray.push(match);
            return "___selector___"
        })
        code = code.replace(css_values, function (match) {
            valueArray.push(match);
            return "___value___"
        })
        code = this.sanitizeHtmlTags(code)
        for (let i = 0; i < commentArray.length; i++) {
            code = code.replace(comment, `<span class='hlc_css_comment${this.suffix}'>` + commentArray[i] + `</span>`);
        }
        for (let i = 0; i < valueArray.length; i++) {
            code = code.replace(value, `<span class='hlc_css_value${this.suffix}'>` + valueArray[i] + `</span>`);
        }

        for (let i = 0; i < stringArray.length; i++) {
            code = code.replace(string, `<span class='hlc_css_string${this.suffix}'>` + stringArray[i] + `</span>`);
        }
        for (let i = 0; i < selectorArray.length; i++) {
            code = code.replace(selector, `<span class='hlc_css_selector${this.suffix}'>` + selectorArray[i] + `</span>`);
        }
        code = code.replace(css_functions, `<span class="hlc_css_function${this.suffix}">$&</span>`)
            .replace(css_numbers, `<span class="hlc_css_number${this.suffix}">$&</span>`)
            .replace(css_parentheses, `<span class="hlc_css_parentheses${this.suffix}">$&</span>`)
            .replace(css_brackets, `<span class="hlc_css_brackets${this.suffix}">$&</span>`)
            .replace(css_braces, `<span class="hlc_css_braces${this.suffix}">$&</span>`)
        return code;
    }
}

// COMPONENT

interface HighlightCodeProps {
    code: string;
    language: "html" | "php" | "css" | "js" | "ts";
    theme?: "light" | "dark";
    width?: string;
    height?: string;
    fontSize?: string;
    customerTheme?: Theme;
}

/**
 * Componente HighlightCode
 * 
 * This component is responsible for highlighting code in an editor or viewer.
 * It receives several props that allow you to customize the code's appearance, size, and theme.
 * 
 * @param code The code to be highlighted.
 * @param language The programming language of the code ("html", "php", "js", "ts" or "css").
 * @param theme The theme to apply to the code (it can be "dark" or "light").
 * @param width (string) Width of the component area (e.g. "500px"). 
 * @param height (string) High of the component area (e.g. "500px").
 * @param fontSize Font size of the code.
 * @param customerTheme (@type Theme) A custom theme that will be passed to override the default colors.
 * 
 */
const HighlightCode = ({ code, language, theme, width, height, fontSize, customerTheme }: HighlightCodeProps) => {

    const [suffix] = useState(Math.random().toString(36).substring(10));
    const [text, setText] = useState(code)
    const [themeState, setThemeState] = useState(theme || "dark")
    const hlc = useMemo(() => new HighlightCodeClass(themeState, suffix), [themeState]);
    if (customerTheme) {
        hlc.setDefaultTheme(customerTheme)
    }
    const lan = useRef(language)
    const [build, setBuild] = useState(false)

    useEffect(() => {
        const hl = async () => {
            switch (lan.current) {
                case "html":
                    setText(await hlc.html(code))
                    break;
                case "php":
                    setText(await hlc.php(code))
                    break
                case "css":
                    setText(await hlc.css(code))
                    break
                case "js":
                    setText(await hlc.js(code))
                    break
                case "ts":
                    setText(await hlc.ts(code))
                    break
            }
            setThemeState(theme || "dark")

        }
        hl()
    }, [code, language, theme]);

    useEffect(() => {
        const apply = async () => {
            if (customerTheme) {
                hlc.setDefaultTheme(customerTheme)
            } else {
                hlc.setDefaultTheme(themeState === "dark" ? darkTheme : lightTheme)
            }
            switch (lan.current) {
                case "html":
                    await hlc.jsTheme()
                    await hlc.cssTheme()
                    await hlc.htmlTheme()
                    break;
                case "php":
                    await hlc.phpTheme()
                    break
                case "css":
                    await hlc.cssTheme()
                    break
                case "js":
                    await hlc.jsTheme()
                    await hlc.htmlTheme()
                    break
                case "ts":
                    await hlc.tsTheme()
                    await hlc.htmlTheme()
                    break
            }

            setBuild(true)
        }
        apply()
    })

    return (
        <div style={{ width: width, height: height, fontSize: fontSize }} >
            <div style={hlc.defaultTheme.container as React.CSSProperties}>
                {build &&
                    <pre dangerouslySetInnerHTML={{ __html: text }}></pre >
                }
            </div>
        </div>
    );
};

export default HighlightCode;
// git