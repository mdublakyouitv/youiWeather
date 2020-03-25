#ifndef _SHADOOW_FOCUS_ZONE_VIEW_H_
#define _SHADOOW_FOCUS_ZONE_VIEW_H_

#include "youireact/nodes/ShadowView.h"
#include "FocusZoneManagerModule.h"
#include "FocusZoneView.h"
#include "FocusZoneProps.h"


namespace yi
{
    namespace react
    {
        class ShadowFocusZoneView: public ShadowView
        {
        public:
            enum class RestoreMode
            {
                RestoreFixed,
                RestoreLast
            };

            ShadowFocusZoneView();
            virtual ~ShadowFocusZoneView() final;

            YI_RN_EXPORT_NAME(FocusZoneView);
            YI_RN_DECLARE_MANAGER(FocusZoneManagerModule);

            virtual const FocusZoneView *GetCounterpart() const override;
            virtual FocusZoneView *GetCounterpart() override;

            virtual FocusZoneProps *GetSavedProps() override;

            void DescendantsChangedFocus();
            void DescendantGainedFocus();

        private:
            virtual std::unique_ptr<CYISceneNode> CreateCounterpart(CYISceneManager *pSceneManager) final;

            YI_TYPE_BASES(ShadowFocusZoneView, ShadowView);
        };
    }
}

#endif

