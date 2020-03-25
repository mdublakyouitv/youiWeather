#include "FocusZoneView.h"

#include <focus/YiFocus.h>

using namespace yi::react;

YI_TYPE_DEF_INST(FocusZoneView, CYISceneView);

FocusZoneView::FocusZoneView() = default;
FocusZoneView::~FocusZoneView() = default;

void FocusZoneView::SetRestoreFocus(CYISceneNode &node)
{
    m_restoreFocusNode = node.GetSceneNodeProxy();
}

void FocusZoneView::ClearRestoreFocus()
{
    m_restoreFocusNode.reset();
}

bool FocusZoneView::RequestFocus(CYIFocus::Direction direction, CYIFocus::FocusRootRule rule, const CYIAABB &previousFocusRect,
                                    const CYIFocusSearchOptions &options)
{
    return RestoreFocusState() || CYISceneView::RequestFocus(direction, rule, previousFocusRect, options);
}

bool FocusZoneView::HandlesFocusInDescendants() const
{
    return true;
}

CYISceneView *FocusZoneView::FindNextFocusInDescendants(const CYISceneView *pCurrentFocusView, CYIFocus::Direction direction, CYIAABB &, const CYIFocusSearchOptions &) const
{
    return CYIFocus::FindNextFocusInRegion(this, CYIFocus::GetScreenSpaceFocusRegion(pCurrentFocusView), direction, CYIFocus::GetScreenSpaceFocusRegion(this));
}

bool FocusZoneView::RestoreFocusState()
{
    if (m_restoreFocusNode && m_restoreFocusNode->m_pNode != nullptr)
    {
        return static_cast<CYISceneView *>(m_restoreFocusNode->m_pNode)->RequestFocus();
    }

    return false;
}

