#ifndef _FOCUS_ZONE_VIEW_H_
#define _FOCUS_ZONE_VIEW_H_

#include <scenetree/YiSceneNodeProxy.h>
#include <view/YiSceneView.h>

namespace yi
{
    namespace react
    {
        class FocusZoneView : public CYISceneView
        {
        public:
            FocusZoneView();
            virtual ~FocusZoneView();

            void SetRestoreFocus(CYISceneNode &node);
            void ClearRestoreFocus();

            virtual bool RequestFocus(CYIFocus::Direction direction = CYIFocus::Direction::Forward, CYIFocus::FocusRootRule focusRootRule = CYIFocus::FocusRootRule::DescendantsUpdateContext, const CYIAABB &previousFocusRect = CYIAABB(), const CYIFocusSearchOptions &options = CYIFocusSearchOptions()) override;

        protected:
            virtual bool HandlesFocusInDescendants() const override;
            virtual CYISceneView *FindNextFocusInDescendants(const CYISceneView *pCurrentFocusView, CYIFocus::Direction direction, CYIAABB &screenSpaceFocusRegion, const CYIFocusSearchOptions &options = CYIFocusSearchOptions()) const override;

        private:
            bool RestoreFocusState();

            std::shared_ptr<CYISceneNodeProxy> m_restoreFocusNode;

            YI_DISALLOW_COPY_AND_ASSIGN(FocusZoneView)

            YI_TYPE_BASES(FocusZoneView, CYISceneView)
        };
    }
}

#endif // _FOCUS_ZONE_VIEW_H_
