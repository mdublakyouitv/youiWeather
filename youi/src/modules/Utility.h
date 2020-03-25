/*
You i Labs Inc. All rights reserved.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
#ifndef _UTILITY_H_
#define _UTILITY_H_

#include <youireact/ShadowTree.h>

namespace utility
{
const CYIString LOG_TAG = "Utility";

inline CYISceneNode *GetCounterpart(yi::react::IBridge &bridge, uint64_t tag)
{
    if (auto component = bridge.GetShadowTree().GetShadowRegistry().Get(tag))
    {
        return component->GetCounterpart();
    }
    else
    {
        YI_LOGE(LOG_TAG, "Tag %" PRIu64 " not found", tag);
    }

    return nullptr;
}

template<typename T>
inline T *GetCounterpart(yi::react::IBridge &bridge, uint64_t tag)
{
    if (auto node = GetCounterpart(bridge, tag))
    {
        if (auto castedCounterpart = dynamic_cast<T *>(node))
        {
            return castedCounterpart;
        }
        else
        {
            YI_LOGE(LOG_TAG, "Type %s is invalid for counterpart", typeid(T).name());
        }
    }
    else
    {
        YI_LOGE(LOG_TAG, "Counterpart not found for tag %" PRIu64, tag);
    }

    return nullptr;
}

}

#endif
