type InterpolateHclType = (v: number) => string;

declare module 'd3-interpolate' {
    function interpolateHcl(color1: string, color2: string): InterpolateHclType
};
