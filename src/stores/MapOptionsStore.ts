import Store from '@/stores/Store'
import { Action } from '@/stores/Dispatcher'
import {
    MapIsLoaded,
    SelectMapLayer,
    ToggleOverlayMapLayer,
    ToggleExternalMVTLayer,
    ToggleRoutingGraph,
    ToggleUrbanDensityLayer,
} from '@/actions/Actions'
import config from 'config'

const osmAttribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors (ODbL)'
const osmFRAttr =
    'rendering by <a href="https://www.openstreetmap.fr/mentions-legales/" target="_blank">OpenStreetMap France</a>'
const osmDEAttr =
    'rendering by <a href="https://openstreetmap.de/germanstyle/" target="_blank">OpenStreetMap Deutschland</a>'
const osmCHAttr =
    'rendering by <a href="https://sosm.ch/projects/tile-service/" target="_blank">SOSM, elevation: ASTER GDEM, EarthEnv-DEM90, CDEM contains information under OGL Canada</a>'
const openrailwaymapAttr =
    'rendered by <a href="https://openrailwaymap.org/" target="_blank">OpenRailwayMap</a>'

export interface MapOptionsStoreState {
    styleOptions: StyleOption[]
    overlayStyleOptions: StyleOption[]
    selectedStyle: StyleOption
    selectedOverlayStyles: StyleOption[]
    isMapLoaded: boolean
    routingGraphEnabled: boolean
    urbanDensityEnabled: boolean
    externalMVTEnabled: boolean
}

export interface StyleOption {
    name: string
    type: 'raster' | 'vector'
    url: string[] | string
    attribution: string
    maxZoom?: number
    tileSize?: number
    overlay?: boolean
}

export interface RasterStyle extends StyleOption {
    type: 'raster'
    url: string[]
    tilePixelRatio?: number
}

export interface VectorStyle extends StyleOption {
    type: 'vector'
    url: string
}

const mediaQuery =
    '(-webkit-min-device-pixel-ratio: 1.5),(min--moz-device-pixel-ratio: 1.5),(-o-min-device-pixel-ratio: 3/2),(min-resolution: 1.5dppx)'
const isRetina = window.devicePixelRatio > 1 || (window.matchMedia && window.matchMedia(mediaQuery).matches)
const tilePixelRatio = isRetina ? 2 : 1
const retina2x = isRetina ? '@2x' : ''

const osmOrg: RasterStyle = {
    name: 'OpenStreetMap',
    type: 'raster',
    url: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
    attribution: osmAttribution,
    maxZoom: 19,
}

const osmDE: RasterStyle = {
    name: 'OpenStreetMap.de',
    type: 'raster',
    url: ['https://tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'],
    attribution: osmAttribution + ' ' + osmDEAttr,
    maxZoom: 19,
}

const osmCH: RasterStyle = {
    url: ['https://tile.osm.ch/switzerland/{z}/{x}/{y}.png'],
    name: 'OpenStreetMap.ch',
    type: 'raster',
    attribution: osmAttribution + ' ' + osmCHAttr,
}

const osmFR: RasterStyle = {
    url: ['https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png'],
    name: 'OpenStreetMap.fr',
    type: 'raster',
    attribution: osmAttribution + ' ' + osmFRAttr,
}

const openrailwaymapStandard: RasterStyle = {
    url: ['https://tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png'],
    name: 'OpenRailwayMap Infrastructure',
    type: 'raster',
    attribution: osmAttribution + ' ' + openrailwaymapAttr,
    maxZoom: 19,
    tilePixelRatio: 2,
}

const openrailwaymapMaxspeed: RasterStyle = {
    url: ['https://tiles.openrailwaymap.org/maxspeed/{z}/{x}/{y}.png'],
    name: 'OpenRailwayMap Maxspeed',
    type: 'raster',
    attribution: osmAttribution + ' ' + openrailwaymapAttr,
    maxZoom: 19,
    tilePixelRatio: 2,
}

const styleOptions: StyleOption[] = [
    osmOrg,
    osmDE,
    osmCH,
    osmFR,
]

const overlayStyleOptions: StyleOption[] = [
    openrailwaymapStandard,
    openrailwaymapMaxspeed,
]

export default class MapOptionsStore extends Store<MapOptionsStoreState> {
    constructor() {
        super(MapOptionsStore.getInitialState())
    }

    private static getInitialState(): MapOptionsStoreState {
        const selectedStyle = styleOptions.find(s => s.name === config.defaultTiles)
        if (!selectedStyle)
            console.warn(
                `Could not find tile layer specified in config: '${config.defaultTiles}', using default instead`,
            )
        return {
            selectedStyle: selectedStyle ? selectedStyle : osmOrg,
            selectedOverlayStyles: [],
            styleOptions,
            overlayStyleOptions,
            routingGraphEnabled: false,
            urbanDensityEnabled: false,
            externalMVTEnabled: false,
            isMapLoaded: false,
        }
    }

    reduce(state: MapOptionsStoreState, action: Action): MapOptionsStoreState {
        if (action instanceof SelectMapLayer) {
            const styleOption = state.styleOptions.find(o => o.name === action.layer)
            if (styleOption)
                return {
                    ...state,
                    selectedStyle: styleOption,
                }
        } else if (action instanceof ToggleOverlayMapLayer) {
            const newSelection = action.checked ?
                state.selectedOverlayStyles.concat(state.overlayStyleOptions.filter(o => o.name === action.layer))
                : state.selectedOverlayStyles.filter(o => o.name !== action.layer)
            if (newSelection)
                return {
                    ...state,
                    selectedOverlayStyles: newSelection,
                }
        } else if (action instanceof ToggleRoutingGraph) {
            if (state.routingGraphEnabled === action.routingGraphEnabled) return state
            return {
                ...state,
                routingGraphEnabled: action.routingGraphEnabled,
            }
        } else if (action instanceof ToggleUrbanDensityLayer) {
            if (state.urbanDensityEnabled === action.urbanDensityEnabled) return state
            return {
                ...state,
                urbanDensityEnabled: action.urbanDensityEnabled,
            }
        } else if (action instanceof ToggleExternalMVTLayer) {
            if (state.externalMVTEnabled === action.externalMVTLayerEnabled) return state
            return {
                ...state,
                externalMVTEnabled: action.externalMVTLayerEnabled,
            }
        } else if (action instanceof MapIsLoaded) {
            return {
                ...state,
                isMapLoaded: true,
            }
        }
        return state
    }
}
