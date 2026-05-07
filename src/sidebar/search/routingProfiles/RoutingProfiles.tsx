import React, { useEffect, useState } from 'react'
import styles from './RoutingProfiles.module.css'
import Dispatcher from '@/stores/Dispatcher'
import { SetVehicleProfile, SetVehicleProfileGroup } from '@/actions/Actions'
import { RoutingProfile } from '@/api/graphhopper'
import PlainButton from '@/PlainButton'
import { tr } from '@/translation/Translation'
import CustomModelBoxSVG from '@/sidebar/open_custom_model.svg'
import { icons } from '@/sidebar/search/routingProfiles/profileIcons'
import * as config from 'config'

export default function ({
    routingProfiles,
    selectedProfile,
    memorizedProfilePerGroup,
    showCustomModelBox,
    toggleCustomModelBox,
    customModelBoxEnabled,
}: {
    routingProfiles: RoutingProfile[]
    selectedProfile: RoutingProfile
    memorizedProfilePerGroup: Record<string, string>
    showCustomModelBox: boolean
    toggleCustomModelBox: () => void
    customModelBoxEnabled: boolean
}) {

    return (
        <div className={styles.profilesParent}>
            <PlainButton
                title={tr('open_custom_model_box')}
                className={showCustomModelBox ? styles.enabledCMBox : styles.cmBox}
                onClick={toggleCustomModelBox}
            >
                <CustomModelBoxSVG />
            </PlainButton>
            <div className={styles.routingProfiles}>
                <select className={styles.profiles} id="profiles_carousel_items"
                    onChange={(e) => {
                            const profile = routingProfiles.find(p => p.name === e.target.value)
                            if (profile)
                                Dispatcher.dispatch(new SetVehicleProfile(profile))
                        }
                    }>
                    {routingProfiles
                        .map(profile => {
                            const isProfileSelected =
                                profile.name === selectedProfile.name
                            const className = isProfileSelected
                                ? styles.selectedProfile + ' ' + styles.profileBtn
                                : styles.profileBtn
                            return (
                                <option value={profile.name}
                                        className={className}
                                  //  >
                                  //      {customModelBoxEnabled && profile.name === selectedProfile.name && (
                                  //          <CustomModelBoxSVG className={styles.asIndicator} />
                                  //      )}
                                >
                                        {tr(profile.name)}
                                </option>
                            )
                        })}
                </select>
            </div>
        </div>
    )
}
