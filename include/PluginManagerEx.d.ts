interface IPluginManagerEx {
    createParameter(currentScript: HTMLOrSVGElement): NonNullable<any>
    findMetaValue(object: NonNullable<any>, nameList: string | string[]): any
    convertVariables(text: string, data?: any): any
    createCommandArgs(args: any): any
}

declare var PluginManagerEx: IPluginManagerEx | undefined
