#ifndef _FOCUS_ZONE_MANAGER_MODULE_H_
#define _FOCUS_ZONE_MANAGER_MODULE_H_

#include <youireact/modules/components/AbstractComponentManagerModule.h>
#include <youireact/modules/components/IViewManager.h>


namespace yi
{
    namespace react
    {
        class ShadowFocusZoneView;

        class YI_RN_MODULE(FocusZoneManagerModule, AbstractComponentManagerModule), public IViewManager
        {
        public:
            YI_RN_EXPORT_NAME(FocusZoneManager);

            YI_RN_DEFINE_COMPONENT_MODULE();

            YI_RN_EXPORT_COMMAND(setRestoreFocus)
            (ReactComponent *shadowView, uint64_t focusTag);

        public:
            void SaveFocus(ShadowFocusZoneView &instance);

        protected:
            virtual void SetupProperties() override;
            virtual void ConfigureCounterpartPriv(ReactComponent & instance) override;
            virtual void DismantleCounterpartPriv(ReactComponent & instance) override;
        };
    }
}


#endif
