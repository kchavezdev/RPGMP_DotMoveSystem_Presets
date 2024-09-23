interface IPluginManagerEx {
    createParameter(currentScript: HTMLOrSVGElement): NonNullable<any>
    findMetaValue(object: NonNullable<any>, nameList: string | string[]): any
}

declare var PluginManagerEx: IPluginManagerEx | undefined
