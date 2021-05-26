const ClosureCompiler = require("google-closure-compiler").compiler;


const compiler = new ClosureCompiler({
  js: ["node_modules/google-closure-library/third_party/closure/goog/mochikit/async/**.js","node_modules/google-closure-library/closure/goog/**.js", "dist/**.js", "src/**.js"],
  compilation_level: "SIMPLE",
  js_output_file: "build/out.js",
  debug: true,
  dependency_mode: "SORT_ONLY",
  define: "jre.checkedMode=DISABLED",
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
