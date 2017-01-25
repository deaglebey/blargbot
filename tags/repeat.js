var e = module.exports = {};

e.init = () => {
    e.category = bu.TagType.COMPLEX;
};

e.requireCtx = require;

e.isTag = true;
e.name = 'repeat';
e.args = '&lt;text&gt; &lt;amount&gt;';
e.usage = '{repeat;text;amount}';
e.desc = 'Repeats <code>text</code> <code>amount</code> times.';
e.exampleIn = '{repeat;e;10}';
e.exampleOut = 'eeeeeeeeee';

e.execute = async function(params) {
    //   for (let i = 1; i < params.args.length; i++) {
    //       params.args[i] =await bu.processTagInner(params, i);
    //   }
    let fallback = params.fallback;
    var replaceString = '';
    var replaceContent = false;
    var parsedFallback = parseInt(fallback);
    if (params.args[1] && params.args[2]) {
        let args2 = parseInt(await bu.processTagInner(params, 2));
        if (isNaN(args2)) {
            if (isNaN(parsedFallback)) {
                return {
                    terminate: params.terminate,
                    replaceString: await bu.tagProcessError(params, '`Not a number`'),
                    replaceContent: replaceContent
                };
            } else {
                args2 = parsedFallback;
            }
        }
        if (args2 < 0) {
            return {
                terminate: params.terminate,
                replaceString: await bu.tagProcessError(params, '`Can\'t be negative`'),
                replaceContent: replaceContent
            };
        }
        if (args2 > 500) {
            return {
                terminate: params.terminate,
                replaceString: await bu.tagProcessError(params, '`Too Many Loops`'),
                replaceContent: replaceContent
            };
        }
        replaceString = '';
        for (let i = 0; i < args2; i++) {
            replaceString += await bu.processTagInner(params, 1);
        }
    } else {
        replaceString = await bu.tagProcessError(params, '`Not enough arguments`');
    }

    return {
        terminate: params.terminate,
        replaceString: replaceString,
        replaceContent: replaceContent
    };
};