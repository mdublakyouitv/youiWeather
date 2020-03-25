#include "ShadowFocusZoneView.h"

#include <youireact/ViewBuilder.h>

using namespace yi::react;

YI_TYPE_DEF_INST(ShadowFocusZoneView, ShadowView);

ShadowFocusZoneView::ShadowFocusZoneView()
{
     m_savedProps.reset(new FocusZoneProps());
}

ShadowFocusZoneView::~ShadowFocusZoneView() = default;

FocusZoneProps *ShadowFocusZoneView::GetSavedProps()
{
    return static_cast<FocusZoneProps *>(ShadowView::GetSavedProps());
}

const FocusZoneView *ShadowFocusZoneView::GetCounterpart() const
{
    return static_cast<const FocusZoneView *>(ShadowView::GetCounterpart());
}

FocusZoneView *ShadowFocusZoneView::GetCounterpart()
{
    return const_cast<FocusZoneView *>(static_cast<const ShadowFocusZoneView *>(this)->GetCounterpart());
}

void ShadowFocusZoneView::DescendantGainedFocus()
{
    FocusZoneManagerModule *pManager = static_cast<FocusZoneManagerModule *>(GetManagerModule());
    pManager->SaveFocus(*this);
}

void ShadowFocusZoneView::DescendantsChangedFocus()
{
    FocusZoneManagerModule *pManager = static_cast<FocusZoneManagerModule *>(GetManagerModule());
    pManager->SaveFocus(*this);
}

std::unique_ptr<CYISceneNode> ShadowFocusZoneView::CreateCounterpart(CYISceneManager *pSceneManager)
{
    return ViewBuilder::Create<FocusZoneView>(pSceneManager);
}
