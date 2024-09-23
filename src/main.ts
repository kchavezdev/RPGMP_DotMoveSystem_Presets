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

// Parse plugin parameters in header
{
    function isValidNumber(num: any) {
        return typeof num === 'number' && isFinite(num) && !isNaN(num);
    }

    function copyNumberProperties(obj1: NonNullable<any>, obj2: NonNullable<any>) {
        Object.keys(obj1).forEach(key => {
            const value = obj1[key];
            if (isValidNumber(value)) obj2[key] = value;
        });
    }

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


