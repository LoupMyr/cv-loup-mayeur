const sass = require("sass");
const path = require("path");

module.exports = function(eleventyConfig) {
  // SCSS
  eleventyConfig.addExtension("scss", {
		outputFileExtension: "css",

		// opt-out of Eleventy Layouts
		useLayouts: false,

		compile: async function (inputContent, inputPath) {
			let parsed = path.parse(inputPath);
			// Don’t compile file names that start with an underscore
			if(parsed.name.startsWith("_")) {
				return;
			}

			let result = sass.compileString(inputContent, {
				loadPaths: [
					parsed.dir || ".",
					this.config.dir.includes,
					"node_modules"
				]
			});

			// Map dependencies for incremental builds
			this.addDependencies(inputPath, result.loadedUrls);

			return async (data) => {
				return result.css;
			};
		},
	});

  // Copy the `img` and `scripts` folders to the output
  eleventyConfig.addPassthroughCopy("src/assets/images");
  eleventyConfig.addPassthroughCopy("src/scripts");
  
  // Copy error page
  eleventyConfig.addPassthroughCopy("src/error.html");

  // Copy Bootstrap JS
  eleventyConfig.addPassthroughCopy({
    "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js": "js/bootstrap.bundle.min.js"
  });

  // Copy Bootstrap Icons fonts
  eleventyConfig.addPassthroughCopy({
    "node_modules/bootstrap-icons/font/fonts": "scss/fonts"
  });

  return {
    templateFormats: ['html', 'liquid', 'md', 'scss'],
    dir: {
      input: "src",
      output: "dist"
    }
  };
}