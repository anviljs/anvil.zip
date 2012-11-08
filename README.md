## Anvil ZIP Plugin

This plugin requires anvil.js version 0.8.* or greater.

## Installation

Ensure that you've installed anvil.js 

```text
	anvil install anvil.zip
```

## Usage

After you have installed the plugin you first need to reference the plugin inside the `dependencies` key of your `build.json`.

```javascript
{
	"source": "src",
	"spec": "spec",
	"output": [ "build" ],
	"dependencies" : [ "anvil.zip" ],
	"anvil.zip": {
		// Required settings here...
	}
}
```

The plugin is configured to not zip up your package by default.  You must enable the plugin to output a zip file.

### Settings

#### Zip your output folder by default

This plugin's default behavior is not to zip your file on each run of Anvil.  If you would like to zip your plugin by default, simply add the `runByDefault` configuration option to your `build.json` file.

```javascript
{
	"source": "src",
	"spec": "spec",
	"output": [ "build" ],
	"dependencies" : [ "anvil.zip" ],
	"anvil.zip": {
		"runByDefault": true
	}
}
```

#### Set the Output Folder

This plugin is configured to place the zip files into a `build` folder by default.  You can configure where you'd like the default folder to be whatever you'd like.  Just specify the folder via a configuration option in your `build.json` file.

```javascript
{
	"source": "src",
	"spec": "spec",
	"output": [ "build" ],
	"dependencies" : [ "anvil.zip" ],
	"anvil.zip": {
		"buildDir": "zips"
	}
}
```

#### Specify the file name prefix

The zip files have the date and time of the build appended to them, but you can specify a custom file prefix.  To do this, set the file prefix in the build options to whatever you'd like.

```javascript
{
	"source": "src",
	"spec": "spec",
	"output": [ "build" ],
	"dependencies" : [ "anvil.zip" ],
	"anvil.zip": {
		"filePrefix": "my-file-prefix-"
	}
}
```

## Uninstallation

```text
	anvil uninstall anvil.zip
```

## TODOS

* Provide the option to specify the filename via a callback
* Add tests
* Add other archive formats

