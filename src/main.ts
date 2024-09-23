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

// Parse plugin parameters in header
{

    let pluginParams: IPluginParams;

    if (window.PluginManagerEx) {
        pluginParams = PluginManagerEx!.createParameter(document.currentScript!);
    }
    else {
        pluginParams = PluginParameterParser.getPluginParameters(document['currentScript']!['src'] as string)
    }

    const presetParams = pluginParams.presets;

    if (Array.isArray(presetParams)) {
        presetParams.forEach(preset => {
            const properties = preset.dotMoveProperties;
            if (typeof properties === 'object') {

                const id = preset.id.toString();

                if (id.contains(',')) {
                    throw new Error('DotMoveSystem_Preset: Error parsing presets! Preset identifier cannot contain \',\' character!');
                }

                if (id === '[object Object]') {
                    console.warn('DotMoveSystem_Preset: The identifier of at least one preset is [object Object]');
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


