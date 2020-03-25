#include "FocusZoneManagerModule.h"

#include "FocusZoneProps.h"
#include "ShadowFocusZoneView.h"
#include "modules/Utility.h"

using namespace yi::react;

YI_RN_INSTANTIATE_MODULE(FocusZoneManagerModule, AbstractComponentManagerModule);

YI_RN_OVERRIDE_OnInit(FocusZoneManagerModule);
YI_RN_OVERRIDE_OnLayoutApplied(FocusZoneManagerModule);
YI_RN_OVERRIDE_ApplyProps(FocusZoneManagerModule);
YI_RN_OVERRIDE_DismantleCounterpart(FocusZoneManagerModule);
YI_RN_OVERRIDE_ConfigureCounterpart(FocusZoneManagerModule);

const CYIString LOG_TAG = "FocusZoneManagerModule";

folly::dynamic FocusZoneManagerModule::GetNativeProps()
{
    folly::dynamic superProps = IViewManager::GetNativeProps();
    folly::dynamic props = folly::dynamic::object("restore", "string");
    return folly::dynamic::merge(superProps, props);
}

void FocusZoneManagerModule::SetupProperties()
{
    IViewManager::SetupProperties();

    YI_RN_DEFINE_PROPERTY("restore", [](ShadowFocusZoneView &self, FocusZoneProps::RestoreMode restoreMode) {
        self.GetSavedProps()->restoreMode = restoreMode;
    });
}

void FocusZoneManagerModule::ConfigureCounterpartPriv(ReactComponent &inst)
{
    ShadowFocusZoneView &instance = static_cast<ShadowFocusZoneView &>(inst);
    IViewManager::ConfigureCounterpartPriv(instance);

    auto counterpart = instance.GetCounterpart();
    counterpart->DescendantsChangedFocus.Connect(instance, &ShadowFocusZoneView::DescendantsChangedFocus);
    counterpart->DescendantGainedFocus.Connect(instance, &ShadowFocusZoneView::DescendantGainedFocus);
}

void FocusZoneManagerModule::DismantleCounterpartPriv(ReactComponent &inst)
{
    ShadowFocusZoneView &instance = static_cast<ShadowFocusZoneView &>(inst);
    IViewManager::DismantleCounterpartPriv(instance);

    auto counterpart = instance.GetCounterpart();
    counterpart->DescendantsChangedFocus.Disconnect(instance);
    counterpart->DescendantGainedFocus.Disconnect(instance);
}

YI_RN_DEFINE_EXPORT_COMMAND(FocusZoneManagerModule, setRestoreFocus)
(ReactComponent *shadowView, uint64_t focusTag)
{
    auto shadowFocusZoneView = YiDynamicCast<ShadowFocusZoneView>(shadowView);
    YI_ASSERT(shadowFocusZoneView, LOG_TAG, "ReactComponent is not ShadowFocusZoneView");
    auto focusZoneView = shadowFocusZoneView->GetCounterpart();
    auto initialFocusNode = utility::GetCounterpart(GetBridge(), focusTag);
    focusZoneView->SetRestoreFocus(*initialFocusNode);
}

void FocusZoneManagerModule::SaveFocus(ShadowFocusZoneView &instance)
{
    auto counterpart = instance.GetCounterpart();
    if (CYISceneView *pViewWithFocus = counterpart->GetSceneManager()->GetViewWithFocus())
    {
        if (counterpart->IsAncestorOf(pViewWithFocus))
        {
            if (instance.GetSavedProps()->restoreMode.GetValue() == FocusZoneProps::RestoreMode("last").GetValue())
            {
                counterpart->SetRestoreFocus(*pViewWithFocus);
            }
        }
        else
        {
            counterpart->ClearRestoreFocus();
        }
    }
    else
    {
        counterpart->ClearRestoreFocus();
    }
}
