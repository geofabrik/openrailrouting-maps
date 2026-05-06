declare module '*.css'
declare module '*.svg'
declare module '*.png'
declare module 'custom-model-editor/src/index'

declare module 'config' {
    interface ProfileGroup {
        readonly options: { profile: string }[]
    }

    const routingApi: string
    const geocodingApi: string
    const poiSearch: boolean
    const reverseGeocodingEnabled: boolean
    const defaultTiles: string
    const keys: {
        graphhopper: string
        omniscale: string
        maptiler: string
        thunderforest: string
        kurviger: string
    }
    const info: string
    const docs: string
    const backend_sources: string
    const frontend_sources: string
    const imprint: string
    const privacy: string
    const terms: string
    const request: {
        details: string[]
        snapPreventions: string[]
    }
    const routingGraphLayerAllowed: boolean
    const urbanDensityLayerAllowed: boolean
    const externalMVTLayer: {
        url: string
        styles: {
            // Maps mvt layer names to style properties. Only the layers listed here will be visible.
            [key: string]: {
                color: string
                width: number
            }
        }
        maxZoom?: number
    }
    const profile_group_mapping: Record<string, ProfileGroup>
    const profiles: object
}

declare module 'react-responsive' {
    function useMediaQuery(props: { query: string }): boolean
}

// defined by webpack
declare const GIT_SHA: string
