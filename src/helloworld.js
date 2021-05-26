goog.module("helloworld");

// goog.ENABLE_DEBUG_LOADER = true
const Throwable = goog.require("java.lang.Throwable")
const ConfigBuilder = goog.require(
  "tasty.js.config.DaggerApplicationConfig.Builder"
);
const InvalidSessionHandler = goog.require(
  "com.dough.net.InvalidSessionHandler"
);
const TwStagingEnvironment = goog.require(
  "com.dough.tw.config.TwStagingEnvironment"
);
const JsHttpExceptionHandler$Callback = goog.require(
  "tasty.js.net.JsHttpExceptionHandler.Callback"
);
const AsyncTaskServiceErrorListener = goog.require(
  "com.dough.util.AsyncTaskService.ErrorListener"
);

const InternetChecker = goog.require(
  "com.dough.ui.net.UiHttpExceptionHandler.InternetChecker"
);

const PlatformDetails = goog.require("com.dough.service.PlatformDetails");

class WebInvalidSessionHandler extends InvalidSessionHandler {
  m_onInvalidSession__() {
    alert("Session has been invalidated");
  }
}

class HttpExceptionCallback extends JsHttpExceptionHandler$Callback {
  m_logWarning__java_lang_String__java_lang_Throwable(message) {
    console.warn(message);
  }
  m_logRuntimeException__java_lang_String__java_lang_RuntimeException(message) {
    console.error(message);
  }
  m_notifyUserOfNetWorkIssue__() {
    alert("Network issue");
  }
  m_notifyUserOfPossibleIpBan__() {
    alert("IP Banned 🔨");
  }
}

class WebAsyncTaskServiceErrorListener extends AsyncTaskServiceErrorListener {
  m_onError__java_lang_Object__java_lang_Object__java_lang_Throwable(
    context,
    target,
    e
  ) {
    console.error(e.getMessage());
  }
  m_onError__java_lang_Object__com_dough_util_RequestState(context, state) {
    console.error(state.errorMessage);
  }
}

class WebPlatformDetails extends PlatformDetails {
  m_getName__() {
    return window.navigator.platform;
  }
  m_getVersion__() {
    return window.navigator.appVersion;
  }
  m_toSourceIdentifier__() {
    return `${this.m_getName__()};${this.m_getVersion__()}`;
  }
}

class WebInternetChecker extends InternetChecker {
  m_isInternetConnectionOkay__() {
    return navigator.onLine;
  }
}

function buildConfig() {
  const config = new ConfigBuilder();

  config.m_invalidSessionHandler__com_dough_net_InvalidSessionHandler(
    new WebInvalidSessionHandler()
  );

  config.m_httpExceptionHandlerCallback__tasty_js_net_JsHttpExceptionHandler_Callback(
    new HttpExceptionCallback()
  );

  config.m_asyncExceptionHandler__com_dough_util_AsyncTaskService_ErrorListener(
    new WebAsyncTaskServiceErrorListener()
  );

  config.m_twEnvironment__com_dough_tw_config_TwEnvironment(
    new TwStagingEnvironment()
  );

  config.m_platformDetails__com_dough_service_PlatformDetails(
    new WebPlatformDetails()
  );

  config.m_internetChecker__com_dough_ui_net_UiHttpExceptionHandler_InternetChecker(
    new WebInternetChecker()
  );

  return config.m_build__();
}

const config = buildConfig();

console.log(config);

const loginManager = config.m_getTwLoginManager__()
const sessionManager = config.m_getTwSessionManager__()

console.log(loginManager)

const request = loginManager.m_login__java_lang_String__java_lang_String("devqa250", "devqa250")
request.m_addCompleteListener__com_dough_util_RequestState_CompleteListener(console.log)