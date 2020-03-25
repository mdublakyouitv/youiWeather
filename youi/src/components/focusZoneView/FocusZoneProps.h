#ifndef _FOCUS_ZONE_PROPS_H_
#define _FOCUS_ZONE_PROPS_H_

#include <youireact/JsEnum.h>
#include <youireact/props/PropTypes.h>

struct FocusZoneProps : public yi::react::PropTypes
{
    YI_RN_DEFINE_ENUM(RestoreMode,
        fixed,
        last,
    );

    RestoreMode restoreMode = RestoreMode("last");
};

#endif // _FOCUS_ZONE_PROPS_H_
