const ClosureCompiler = require("google-closure-compiler").compiler;

const compiler = new ClosureCompiler({
  js: ["lib/**.impl.java.js"],
  compilation_level: "SIMPLE",
  js_output_file: "./out.js",
  debug: true,
  dependency_mode: "SORT_ONLY",
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

// require("google-closure-library");

// goog.ENABLE_DEBUG_LOADER = true
// console.log(goog);
// const OrderEntryManager = goog.require("com.dough.ui.orderEntry.manager.OrderEntryManager");
// console.log(OrderEntryManager)

// oem = new OrderEntryManager();
// console.log(oem)
