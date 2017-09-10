module.exports = function mrup(source, emit) {
    let token = null;

    parseText.call(this);

    function parseText() {
        while (true) {
            if (match(/^[^\{]+/)) {
                emit('text', token);
            }
            else if (match(/^\{/)) {
                parseTag.call(this);
            }
            else {
                return;
            }
        }
    }

    function parseTag() {
        if (!match(/^\w+/)) {
            unexpected();
        }
        
        let tagType = token;
        let args = [];

        while (true) {
            match(/^\s+/);

            if (match(/^\}/)) {
                emit(tagType, args);
                return;
            }
            else if (match(/^[^;\}]+/)) {
                args.push(token.replace(/\s+$/, ''));
                match(/^;\s*/);
            }
            else if (match(/^;/)) {
                args.push('');
            }
            else {
                unexpected();
            }
        }
    }
    
    function match(re) {
        let match = re.exec(source);

        if (match) {
            source = source.substr(match[0].length);
            token = match[0];
            return true;
        }
        else {
            token = null;
            return false;
        }
    }

    function unexpected() {
        throw new Error('unexpected ' + (source.length === 0 ? 'end of input' : JSON.stringify(source.substr(0, 1))));
    }
}
