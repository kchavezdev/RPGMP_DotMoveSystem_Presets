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
export var aliases = {
    EventDotMoveTempData_prototype_initialize: DotMoveSystem.EventDotMoveTempData.prototype.initialize
};

function isValidNumber(num: any) {
    return typeof num === 'number' && isFinite(num) && !isNaN(num);
}

function copyNumberProperties(obj1: NonNullable<any>, obj2: NonNullable<any>) {
    for (const key of Object.keys(obj1)) {
        const value = obj1[key];
        if (isValidNumber(value)) obj2[key] = value;
    };
}

function parseSingle(param: any, event?: Game_Event) {
    if (typeof param !== 'string') return param;
    if (window.PluginManagerEx) {
        return PluginManagerEx!.convertVariables(param, event);
    }
    else {
        return PluginParameterParser.tryParseParameter(param, event);
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
        const rawParams = PluginManager.parameters(scriptName);
        const rawPresets: string[] = JsonEx.parse(rawParams.presets);

        presetParams.forEach((preset, index) => {
            const properties = preset.dotMoveProperties;
            if (typeof properties === 'object') {

                const id = preset.id.toString().trim();

                if (!isValidIdentifier(id)) {
                    throw new Error(
                        `DotMoveSystem_Preset: Error parsing presets! Preset identifier cannot contain any of these characters: 
                        [${restrictedCharacters.toString()}]
                        
                        Raw ID in parameters: ${JsonEx.parse(rawPresets[index]).id}`
                    );
                }

                if (presetMap.has(id)) {
                    throw new Error(
                        `DotMoveSystem_Preset: Error! Duplicate preset identifier '${id}' in plugin parameters!
                        
                        Raw ID in parameters: ${JsonEx.parse(rawPresets[index]).id}`
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

function tryApplyPresetValue(DotMoveTempData: DotMoveSystem.EventDotMoveTempData, propertyName: string, presetValue: any) {
    if (isValidNumber(presetValue)) {
        DotMoveTempData[propertyName] = presetValue as number;
    }
}

function tryApplyPresetStruct(DotMoveTempData: DotMoveSystem.EventDotMoveTempData, presetStruct: IDotMoveSystemPreset) {
    tryApplyPresetValue(DotMoveTempData, '_width', presetStruct.width);
    tryApplyPresetValue(DotMoveTempData, '_height', presetStruct.height);
    tryApplyPresetValue(DotMoveTempData, '_offsetX', presetStruct.offsetX);
    tryApplyPresetValue(DotMoveTempData, '_offsetY', presetStruct.offsetY);
    tryApplyPresetValue(DotMoveTempData, '_widthArea', presetStruct.widthArea);
    tryApplyPresetValue(DotMoveTempData, '_heightArea', presetStruct.heightArea);
    tryApplyPresetValue(DotMoveTempData, '_slideLengthX', presetStruct.slideLengthX);
    tryApplyPresetValue(DotMoveTempData, '_slideLengthY', presetStruct.slideLengthY);
}

aliases.EventDotMoveTempData_prototype_initialize = DotMoveSystem.EventDotMoveTempData.prototype.initialize;
DotMoveSystem.EventDotMoveTempData.prototype.initialize = function (this: DotMoveSystem.EventDotMoveTempData, character) {
    aliases.EventDotMoveTempData_prototype_initialize.apply(this, arguments);

    tryApplyPresetStruct(this, eventDefault);

    const meta = (character.getAnnotationValues(0));
    const presetIdentifiers = meta.dotPreset;
    if (presetIdentifiers) {
        for (const presetId of presetIdentifiers.split(',')) {
            const preset = presetMap.get(presetId);
            if (preset) {
                tryApplyPresetStruct(this, preset);
            }
            else {
                console.warn(`DotMoveSystem_Presets: Unknown preset identifier '${presetId}' passed in to event ${character.eventId()}`);
            }
        }

        // once all presets applied, re-apply first page note settings
        tryApplyPresetValue(this, '_width', parseSingle(meta.width, character));
        tryApplyPresetValue(this, '_height', parseSingle(meta.height, character));
        tryApplyPresetValue(this, '_offsetX', parseSingle(meta.offsetX, character));
        tryApplyPresetValue(this, '_offsetY', parseSingle(meta.offsetY, character));
        tryApplyPresetValue(this, '_widthArea', parseSingle(meta.widthArea, character));
        tryApplyPresetValue(this, '_heightArea', parseSingle(meta.heightArea, character));
        tryApplyPresetValue(this, '_slideLengthX', parseSingle(meta.slideLengthX, character));
        tryApplyPresetValue(this, '_slideLengthY', parseSingle(meta.slideLengthY, character));
    }
};
