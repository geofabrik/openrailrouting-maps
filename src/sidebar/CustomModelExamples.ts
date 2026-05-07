import { CustomModel } from '@/utils'

export const customModelExamples: { [key: string]: CustomModel } = {
    default_example: {
        distance_influence: 15,
        priority: [{ if: 'road_environment == TUNNEL', multiply_by: '0.9' }],
        speed: [],
        areas: {
            type: 'FeatureCollection',
            features: [],
        },
    },
    exclude_highspeed: {
        priority: [{ if: 'max_speed > 160', multiply_by: '0.0' }],
    },
    only_1000mm_gauge: {
        priority: [{ if: 'gauge != 1000 && gauge != 0', multiply_by: '0.0' }],
    },
    avoid_tunnels_bridges: {
        priority: [{ if: 'road_environment == TUNNEL || road_environment == BRIDGE', multiply_by: '0.1' }],
    },
    exclude_disneyland_paris: {
        priority: [
            { if: 'road_environment==FERRY', multiply_by: '0.9' },
            { if: 'in_area1', multiply_by: '0' },
        ],
        areas: {
            type: 'FeatureCollection',
            features: [
                {
                    id: 'area1',
                    properties: {},
                    type: 'Feature',
                    geometry: {
                        type: 'Polygon',
                        coordinates: [
                            [
                                [2.74773, 48.876539],
                                [2.751936, 48.794903],
                                [2.850813, 48.819775],
                                [2.808754, 48.887642],
                                [2.74773, 48.876539],
                            ],
                        ],
                    },
                },
            ],
        },
    },
    limit_speed: {
        speed: [
            { if: 'true', limit_to: '90' },
        ],
    },
    shortest: {
        distance_influence: 2000,
    },
    combined: {
        distance_influence: 100,
        speed: [{ if: 'true', limit_to: '90' }],
        priority: [
            { if: 'road_environment == TUNNEL', multiply_by: '0.5' },
        ],
    },
}

export function customModel2prettyString(customModel: CustomModel) {
    return JSON.stringify(customModel, null, 2)
}
