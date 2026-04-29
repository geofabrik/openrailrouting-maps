import React from 'react'
import styles from '@/sidebar/PoweredBy.module.css'
import Logo from '@/sidebar/openrailrouting_logo.svg'
import { tr } from '@/translation/Translation'

export default function PoweredBy() {
    return (
        <div className={styles.poweredByContainer}>
            <span>{tr('powered_by')}</span>
            <a className={styles.logoContainer} href="https://routing.openrailrouting.org" target="_blank">
	        <Logo />
            </a>
        </div>
    )
}
