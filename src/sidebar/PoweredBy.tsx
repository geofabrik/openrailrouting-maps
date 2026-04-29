import React from 'react'
import styles from '@/sidebar/PoweredBy.module.css'
import Logo from '@/sidebar/openrailrouting_logo.svg'
import { tr } from '@/translation/Translation'
import config from 'config'

export default function PoweredBy() {
    return (
        <>
            <div className={styles.poweredByContainer}>
                <span>{tr('powered_by')}</span>
                <a className={styles.logoContainer} href="https://routing.openrailrouting.org" target="_blank">
                <Logo />
                </a>
            </div>
            <div className={styles.infoLine}>
                { config.info && <a href={config.info}>{tr('info')}</a> }
                { config.docs && <a href={config.docs}>{tr('documentation')}</a> }
                { config.backend_sources && <a href={config.backend_sources}>{tr('source code (backend)')}</a> }
                { config.frontend_sources && <a href={config.frontend_sources}>{tr('source code (frontend)')}</a> }
                { config.imprint && <a href={config.imprint}>{tr('imprint')}</a>}
                { config.privacy && <a href={config.privacy}>{tr('privacy')}</a>}
                { config.terms && <a href={config.terms}>{tr('terms')}</a>}
            </div>
        </>
    )
}
