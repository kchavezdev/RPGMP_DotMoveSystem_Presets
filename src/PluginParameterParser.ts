export class PluginParameterParser {
    static convertEscapeCharacters(text: string, event?: Game_Event) {
        // game variable replacements
        const maxVarIterations = 2;
        for (let i = 0; i < maxVarIterations; i++) {
            text = text.replace(/\\/g, '\x1b');
            text = text.replace(/\x1b\x1b/g, '\\');
            text = text.replace(/\x1bV\[(\d+)\]/gi, (_, args) => $gameVariables.value(args).toString());
        }

        // game switch replacements
        text = text.replace(/\x1bS\[(\d+)\]/gi, (_, args) => $gameSwitches.value(args) ? 'true' : 'false');

        // game self switch replacements
        if (event) {
            text = text.replace(/\x1bSS\[([ABCD])\]/gi, (_, args) => $gameSelfSwitches.value([event['_mapId'], event['_eventId'], args.toUpperCase()]) ? 'true' : 'false');
        }

        text = text.replace(/\x1b/g, '\\');

        return text;
    }

    static tryParseParameter(param: any, event?: Game_Event) {
        if (Array.isArray(param)) {
            for (let i = 0; i < param.length; i++) {
                param[i] = this.tryParseParameter(param[i]);
            }
        }

        if (typeof param !== 'string') {
            return param;
        }

        // first try parsing as an object
        try {
            return this.tryParseParameter(JsonEx.parse(param));
        } catch (error) {

        }

        param = this.convertEscapeCharacters(param);

        // this ensures param JUST has numbers in it
        // Number('') returns 0, which is undesirable
        // parseFloat('123abc') returns 123, which is also not wanted
        // so we have to use both to ensure whitespace is not parsed and characters are not ignored
        const num = Number(param);
        if (num === parseFloat(param)) {
            return num;
        }

        if (param === 'true') {
            return true;
        }

        if (param === 'false') {
            return false;
        }

        // if those failed, it's probably a string so leave alone
        return param;
    }

    static getPluginParameters(currentScript: NonNullable<typeof document.currentScript>) {
        const rawParams = PluginManager.parameters((currentScript['src'] as string).split("/").pop()!.replace(/\.js$/, ""));
        const parsedParams: any = {};
        Object.keys(rawParams).forEach(key => parsedParams[key] = this.tryParseParameter(rawParams[key]));
        return parsedParams;
    }
};
