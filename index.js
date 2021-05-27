const ClosureCompiler = require("google-closure-compiler").compiler;

const googLibPath = "node_modules/google-closure-library/closure/goog"

const googLib = (name) => {
  if (name.endsWith(".js")) {
    return `${googLibPath}/${name}`
  }

  return `${googLibPath}/${name}/**.js`
}
const googLibs = (...names) => names.map(googLib)

const compiler = new ClosureCompiler({
  js: [
    googLibs(
      'base.js',
      'goog.js',
      'deps.js',
      "array",
      "asserts/asserts.js",
      "date/date.js",
      "debug/error.js",
      "disposable",
      "dom/asserts.js",
      "dom/nodetype.js",
      "dom/htmlelement.js",
      "dom/safe.js",
      "dom/tagname.js",
      "dom/tags.js",
      "fs/blob.js",
      "fs/url.js",
      "functions",
      "html/safehtml.js",
      "html/safescript.js",
      "html/safestyle.js",
      "html/safestylesheet.js",
      "html/safeurl.js",
      "html/trustedresourceurl.js",
      "html/trustedtypes.js",
      "html/uncheckedconversions.js",
      "i18n/bidi.js",
      "i18n/datetimesymbols.js",
      "iter",
      "labs/useragent/browser.js",
      "labs/useragent/util.js",
      "math",
      "object",
      "reflect",
      "string",
      "structs"
    ),
    "dist/**.js",
    "src/**.js"
  ].flat(),
  compilation_level: "SIMPLE",
  js_output_file: "build/out.js",
  debug: false,
  dependency_mode: "SORT_ONLY",
  define: "goog.DEBUG=false",
  create_source_map: "%outname%.map"
});

compiler.run((exitCode, stdOut, stdErr) => {
  if (exitCode === 0) {
    console.log("COMPILATION COMPLETE");
    console.log(stdOut);
  } else {
    console.log("COMPILATION FAILED - exit code:", exitCode);
    console.log(stdErr);
  }
});
