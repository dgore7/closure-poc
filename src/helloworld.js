goog.module("helloworld");

// goog.ENABLE_DEBUG_LOADER = true
const Throwable = goog.require("java.lang.Throwable")
const ConfigBuilder = goog.require("tasty.js.config.DaggerApplicationConfig.Builder")
const InvalidSessionHandler = goog.require("com.dough.net.InvalidSessionHandler")
const TwStagingEnvironment = goog.require("com.dough.tw.config.TwStagingEnvironment")
const JsHttpExceptionHandler$Callback = goog.require("tasty.js.net.JsHttpExceptionHandler.Callback")
const AsyncTaskServiceErrorListener = goog.require("com.dough.util.AsyncTaskService.ErrorListener");
const InternetChecker = goog.require("com.dough.ui.net.UiHttpExceptionHandler.InternetChecker");
const PlatformDetails = goog.require("com.dough.service.PlatformDetails");

class WebInvalidSessionHandler extends InvalidSessionHandler {
  onInvalidSession() {
    alert("Session has been invalidated");
  }
}

class HttpExceptionCallback extends JsHttpExceptionHandler$Callback {
  logWarning(message, exception) {
    console.warn(message, exception);
  }
  logRuntimeException(message, exception) {
    console.error(message, exception);
  }
  notifyUserOfNetWorkIssue() {
    alert("Network issue");
  }
  notifyUserOfPossibleIpBan() {
    alert("IP Banned 🔨");
  }
}

class WebAsyncTaskServiceErrorListener extends AsyncTaskServiceErrorListener {
  onErrorException(context, target, e) {
    console.error("Async Exception", e);
  }
  onErrorRequestState(context, state) {
    console.error(state.errorMessage);
  }
}

class WebPlatformDetails extends PlatformDetails {
  getName() {
    return "WBT2"
  }
  getVersion() {
    return "Alpha"
  }
}

class WebInternetChecker extends InternetChecker {
  isInternetConnectionOkay() {
    return navigator.onLine;
  }
}

const config = new ConfigBuilder()
  .invalidSessionHandler(new WebInvalidSessionHandler())
  .httpExceptionHandlerCallback(new HttpExceptionCallback())
  .asyncExceptionHandler(new WebAsyncTaskServiceErrorListener())
  .twEnvironment(new TwStagingEnvironment())
  .platformDetails(new WebPlatformDetails())
  .internetChecker(new WebInternetChecker())
  .build()

console.log(config);

const loginManager = config.twLoginManager
const sessionManager = config.twSessionManager

console.log(loginManager)

const request = loginManager.m_login__java_lang_String__java_lang_String("devqa250", "devqa250")
console.log("request", request)

request.addCompleteListener((rs) => console.log("Login completed", rs.detailedStatus))
