// © You i Labs Inc. 2000-2020. All rights reserved.
#include "App.h"

#include <JSBundlingStrings.h>
#include <automation/YiWebDriverLocator.h>
#include <cxxreact/JSBigString.h>
#include <glog/logging.h>

#include "components/focusZoneView/FocusZoneManagerModule.h"
#include "components/focusZoneView/ShadowFocusZoneView.h"

App::App() = default;

App::~App() = default;

using namespace yi::react;

bool App::UserInit()
{
    // Start the web driver for allowing the use of Appium.
    CYIWebDriver *pWebDriver = CYIWebDriverLocator::GetWebDriver();
    if (pWebDriver)
    {
        pWebDriver->Start();
    }

#if !defined(YI_MINI_GLOG)
    // miniglog defines this using a non-const char * causing a compile error and it has no implementation anyway.
    static bool isGoogleLoggingInitialized = false;
    if (!isGoogleLoggingInitialized)
    {
        google::InitGoogleLogging("--logtostderr=1");
        isGoogleLoggingInitialized = true;
    }
#endif

    std::unique_ptr<JsBundleLoader> pBundleLoader(GetBundler());

    PlatformApp::SetJsBundleLoader(std::move(pBundleLoader));

    auto init = PlatformApp::UserInit();

    GetReactNativeViewController().AddModule<FocusZoneManagerModule>();
    GetReactNativeViewController().AddViewModule<ShadowFocusZoneView>();

    return init;
}

bool App::UserStart()
{
    return PlatformApp::UserStart();
}

void App::UserUpdate()
{
    PlatformApp::UserUpdate();
}
