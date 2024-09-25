# RPG Maker MZ - Dot Move System Addon: Presets

I made this because I wanted an easy way to manage collision shapes shared by many 
objects with [DotMoveSystem](https://github.com/unagiootoro/RPGMZ/blob/master/DotMoveSystem.js).

This template was forked from 
[typescript-plugin-archetype](https://github.com/comuns-rpgmaker/typescript-plugin-archetype) 
by [comuns-rpgmaker](https://github.com/comuns-rpgmaker) and has been altered to 
remove the dependency on niokasgami's RPG Maker MZ TypeScript definitions. Instead, 
this fork uses typescript definitions generated from [RPGMakerMZ_TypeDefine](https://github.com/unagiootoro/RPGMakerMZ_TypeDefine) 
by [unagiootoro](https://github.com/unagiootoro/).

## Downloads
If all you care about is downloading the actual plugin file, then you want to 
grab the [latest release](https://github.com/kchavezdev/RPGMP_DotMoveSystem_Presets/releases/latest).

DotMoveSystem_Presets.js is easier to debug and read in a project but has 
a slightly larger file size.

DotMoveSystem_Presets.min.js is a minified version of this plugin that 
saves a few kilobytes of storage space but is unpleasant to work with if 
you need to read the plugin code for any reason.

Use the version that fits your project best.

## Getting Started

First of all, make sure you run `npm install` to install all the dependencies
for the project, such as [rollup.js](https://rollupjs.org/) and typescript.

Also ensure you've run `git submodule update --init --recursive` to clone the 
submodules as well.

Make sure to set `package.json` up correctly, changing the package name to that
of your plugin (this will be used to generate the output file) and adjust the
values of the `version` and `description` fields (and, optionally, `keywords`).
Also make sure to add a property `testProjectDir` if you want to test your
plugin (can be relative).

To configure plugin parameters and the likes, change `plugin-metadata.yaml`.
Read more about it on [comuns-rpgmaker/plugin-metadata][plugin-metadata].

[plugin-metadata]: https://github.com/comuns-rpgmaker/plugin-metadata

Once you are done, `npm run build` will create a JS file for your plugin as
`dist/js/plugins/{pkg.name}.js`.

By default, the plugin is wrapped into an IIFE and everything you export from
`./src/main.ts` is saved under a namespace to be configured in `package.json`.

**TL;DR**:

First:
- `npm install`
- `git submodule update --init --recursive`
- Modify `package.json`

Then:
- Modify `plugin-metadata.yaml` and write Typescript code on `src`
- `npm run build`
- Your plugin shows up compiled in `dist/js/plugins` (plus a debug build in
  whatever test directory you set up!)
- Repeat

## Licensing

This repo was originally forked from [typescript-plugin-archetype](https://github.com/comuns-rpgmaker/typescript-plugin-archetype) 
by [comuns-rpgmaker](https://github.com/comuns-rpgmaker), which was licensed under zlib.
The text of this license has been preserved in the file `typescript-plugin-archetype.LICENSE`.

This RPG Maker plugin is an addon to the [DotMoveSystem](https://github.com/unagiootoro/RPGMZ/blob/master/DotMoveSystem.js) plugin by [unagiootoro](https://github.com/unagiootoro) and uses code from [DotMoveSystem_FunctionEx](https://github.com/unagiootoro/RPGMZ/blob/master/DotMoveSystem_FunctionEx.js) as reference for implementation details.
Both of these plugins are licensed under MIT. The exact text of the license can be found in the file `unagiootoro.LICENSE`.

The rest of the code in this project is licensed under MIT. See the `LICENSE` file for the exact details.
