import { PluginParameterParser } from "PluginParameterParser"

interface IDotMoveSystemPreset {
    width?: number,
    height?: number,
    widthArea?: number,
    heightArea?: number,
    offsetX?: number,
    offsetY?: number,
    slideLengthX?: number,
    slideLengthY?: number,
}

interface ICharacterPreset {
    id: string
    dotMoveProperties: IDotMoveSystemPreset | ''
}

interface IPluginParams {
    presets: ICharacterPreset[] | ''
    eventDefaultProperties: ICharacterPreset | ''
}

export var restrictedCharacters = [',', '{', '}']
export var presetMap: Map<string, IDotMoveSystemPreset> = new Map();
export var eventDefault: IDotMoveSystemPreset = {};
export var aliases: Record<string, (...args: any[]) => any> = {};

function isValidNumber(num: any) {
    return typeof num === 'number' && isFinite(num) && !isNaN(num);
}

function copyNumberProperties(obj1: NonNullable<any>, obj2: NonNullable<any>) {
    Object.keys(obj1).forEach(key => {
        const value = obj1[key];
        if (isValidNumber(value)) obj2[key] = value;
    });
}

function convertEscapeCharacters(param: string) {
    if (typeof param !== 'string') return param;
    if (window.PluginManagerEx) {
        return PluginManagerEx!.convertVariables(param);
    }
    else {
        return PluginParameterParser.convertEscapeCharacters(param);
    }
}

// Returns true if stringToSearch contains any of the strings passed in as the rest of the arguments.
function stringContainsAny(stringToSearch: string, ...stringsToCheckFor: string[]) {
    return stringsToCheckFor.some(str => stringToSearch.contains(str));
}

function isValidIdentifier(id: string) {
    return !stringContainsAny(id, ...restrictedCharacters);
}

// Parse plugin parameters in header
{
    let pluginParams: IPluginParams;

    if (window.PluginManagerEx) {
        pluginParams = PluginManagerEx!.createParameter(document.currentScript!);
    }
    else {
        pluginParams = PluginParameterParser.getPluginParameters(document.currentScript!);
    }

    const presetParams = pluginParams.presets;

    if (Array.isArray(presetParams)) {

        // grabbing raw PluginManager.parameters presets array solely to show the un-processed string in the error message
        const scriptName = (document['currentScript']!['src'] as string).split("/").pop()!.replace(/\.js$/, "");
        const rawParams = PluginManager.parameters(scriptName).presets;
        const rawPresets: { id: string, dotMoveProperties: string }[] = JsonEx.parse(rawParams.presets);

        presetParams.forEach((preset, index) => {
            const properties = preset.dotMoveProperties;
            if (typeof properties === 'object') {

                const id = preset.id.toString();

                if (!isValidIdentifier(id)) {
                    throw new Error(
                        `DotMoveSystem_Preset: Error parsing presets! Preset identifier cannot contain any of these characters: 
                        [${restrictedCharacters.toString()}]
                        
                        Raw preset value: ${rawPresets[index].id}`
                    );
                }

                const presetToAdd: IDotMoveSystemPreset = {};
                copyNumberProperties(properties, presetToAdd);

                presetMap.set(preset.id, presetToAdd);
            }
        });
    }

    const paramEventDefaults = pluginParams.eventDefaultProperties;
    if (paramEventDefaults && typeof paramEventDefaults === 'object') {
        copyNumberProperties(paramEventDefaults, eventDefault);
    }
}


