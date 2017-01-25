var e = module.exports = {};

e.init = () => {
    e.category = bu.TagType.SIMPLE;
};

e.requireCtx = require;

e.isTag = true;
e.name = `guildname`;
e.args = ``;
e.usage = `{guildname}`;
e.desc = `Returns the name of the current guild`;
e.exampleIn = `This guild's name is {guildname}`;
e.exampleOut = `This guild's name is TestGuild`;


e.execute = async function(params) {
    for (let i = 1; i < params.args.length; i++) {
        params.args[i] = await bu.processTagInner(params, i);
    }
    let msg = params.msg;
    var replaceString = msg.channel.guild.name;
    var replaceContent = false;


    return {
        terminate: params.terminate,
        replaceString: replaceString,
        replaceContent: replaceContent
    };
};