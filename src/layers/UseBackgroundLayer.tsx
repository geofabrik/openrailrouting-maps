import { Feature, Map } from 'ol'
import { useEffect } from 'react'
import { RasterStyle, StyleOption } from '@/stores/MapOptionsStore'
import TileLayer from 'ol/layer/Tile'
import ImageTile from 'ol/ImageTile'
import { XYZ } from 'ol/source'
import { apply } from 'ol-mapbox-style'

export default function useMapLayer(map: Map, styleOption: StyleOption, overlayStyleOptions: StyleOption[]) {
    useEffect(() => {
        removeCurrentMapLayers(map)
        addNewMapLayers(map, styleOption, overlayStyleOptions)
        return () => {
            removeCurrentMapLayers(map)
        }
    }, [map, styleOption, overlayStyleOptions])

    // Pointer cursor over interactive features — registered once, independent of style changes
    useEffect(() => {
        const onPointerMove = (evt: any) => {
            if (evt.dragging) return // skip expensive hit-test while panning
            const features = map.getFeaturesAtPixel(evt.pixel)
            const atFeature = features.some(f => f instanceof Feature)
            map.getTargetElement().style.cursor = atFeature ? 'pointer' : 'default'
        }
        map.on('pointermove', onPointerMove)
        return () => {
            map.un('pointermove', onPointerMove)
        }
    }, [map])
}

function removeCurrentMapLayers(map: Map) {
    const backgroundLayers = map
        .getLayers()
        .getArray()
        .filter(l => {
            // vector layers added via olms#addLayers have the mapbox-source key
            return l.get('mapbox-source') || l.get('background-raster-layer') || l.get('overlay-raster-layer')
        })
    backgroundLayers.forEach(l => map.removeLayer(l))
}

function addNewMapLayers(map: Map, styleOption: StyleOption, overlayStyleOptions: StyleOption[]) {
    [styleOption].concat(overlayStyleOptions).forEach((s) => addNewMapLayer(map, s));
}

function addNewMapLayer(map: Map, styleOption: StyleOption) {
    if (styleOption.type === 'vector') {
        // todo: handle promise return value?
        apply(map, styleOption.url)
    } else {
        const rasterStyle = styleOption as RasterStyle
        const tileLayer = new TileLayer({
            source: new XYZ({
                urls: rasterStyle.url,
                maxZoom: rasterStyle.maxZoom,
                attributions: [rasterStyle.attribution],
                tilePixelRatio: rasterStyle.tilePixelRatio,
                tileLoadFunction: (tile, src) => {
                    const img = (tile as ImageTile).getImage() as HTMLImageElement
                    img.referrerPolicy = 'strict-origin-when-cross-origin'
                    img.src = src
                },
            }),
            opacity: rasterStyle.overlay ? 0 : 1,
        })
        if (rasterStyle.overlay) {
            tileLayer.set('overlay-raster-layer', true)
        } else {
            tileLayer.set('background-raster-layer', true)
        }
        map.addLayer(tileLayer)
    }
}
