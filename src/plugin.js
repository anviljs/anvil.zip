var fs  = require('fs'),
		archiver = require('archiver');

var pluginFactory = function( _, anvil ) {
	return anvil.plugin({
		// Name your plugin
		name: "anvil.zip",

		// Activity list: "identify", "pull", "combine", "pre-process","compile", "post-process", "push", "test"
		activity: "post-process",

		// Config Variables
		config: {
			runByDefault: false,
			buildDir: "./build",
			filePrefix: "build-"
		},

		commander: [
			[ "-zip, --zip", "Package your project into a Zip File" ]
		],

		// Computed Output Path
		archivePath: null,

		// Computed Build Path
		buildPath: "./build",

		// Should Zip?
		shouldZip: false,

		// Archiver utility to help when zipping a file
		zip: null,

		// Configure all the things...
		configure: function( config, command, done ) {
			// Build our path
			this.buildPath = anvil.fs.buildPath( this.config.buildDir );

			if(command.zip || this.config.runByDefault) {
				this.shouldZip = true;
			}

			// Ensure build path exists
			anvil.fs.ensurePath( this.buildPath, function ( err ) {
				if( err ) {
					anvil.log.error( err );
				}
				done();
			});
		},

		// Run all the things...
		run: function( done ) {

			if(!this.shouldZip) {
				done();
			}

			// Write the full path to the package
			this.archivePath = fs.realpathSync( this.buildPath ) + "/" + this.config.filePrefix + new Date().getTime() + ".zip";

			var out = fs.createWriteStream(this.archivePath),
					that,
					fileName,
					that = this;

			this.zip = archiver.createZip({ level: 1 });
			this.zip.pipe(out);

			anvil.fs.getFiles(anvil.config.output,anvil.config.output,
				function(files, directories) {

					var addZipFiles = _.map(files, function(file) {
						return function(done) {
							fileName = file.relativePath == "/" ? "/" + file.name : file.relativePath + "/" + file.name;
							that.zip.addFile(fs.createReadStream(file.fullPath), { name: fileName }, done);
							anvil.log.debug("Adding file to ZIP: " + fileName);
						}
					});

					anvil.scheduler.pipeline( undefined, addZipFiles, function() {
						that.zip.finalize(function(size) { 
							anvil.log.event("Wrote zip file to: "+ that.archivePath);
							done();
						});
					});

				}, [], -1);
		},
	});
};

module.exports = pluginFactory;
