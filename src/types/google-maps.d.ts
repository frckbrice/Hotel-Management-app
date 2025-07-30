// declare global {
//     interface Window {
//         google: typeof google;
//     }
// }

// declare namespace google {
//     namespace maps {
//         class Map {
//             constructor(mapDiv: HTMLElement, opts?: MapOptions);
//         }

//         class Marker {
//             constructor(opts?: MarkerOptions);
//             addListener(eventName: string, handler: Function): void;
//         }

//         class InfoWindow {
//             constructor(opts?: InfoWindowOptions);
//             open(map: Map, anchor?: Marker): void;
//         }

//         class Size {
//             constructor(width: number, height: number);
//         }

//         class Point {
//             constructor(x: number, y: number);
//         }

//         interface MapOptions {
//             center?: LatLng | LatLngLiteral;
//             zoom?: number;
//             styles?: MapTypeStyle[];
//             mapTypeControl?: boolean;
//             streetViewControl?: boolean;
//             fullscreenControl?: boolean;
//             zoomControl?: boolean;
//         }

//         interface MarkerOptions {
//             position?: LatLng | LatLngLiteral;
//             map?: Map;
//             title?: string;
//             icon?: string | Icon | Symbol;
//         }

//         interface InfoWindowOptions {
//             content?: string | Element;
//         }

//         interface LatLng {
//             lat(): number;
//             lng(): number;
//         }

//         interface LatLngLiteral {
//             lat: number;
//             lng: number;
//         }

//         interface Icon {
//             url: string;
//             scaledSize?: Size;
//             anchor?: Point;
//         }

//         interface Symbol {
//             path: string;
//             scale?: number;
//             fillColor?: string;
//             fillOpacity?: number;
//             strokeColor?: string;
//             strokeOpacity?: number;
//             strokeWeight?: number;
//         }

//         interface MapTypeStyle {
//             featureType?: string;
//             elementType?: string;
//             stylers?: Array<{ [key: string]: any }>;
//         }

//         namespace event {
//             function clearInstanceListeners(instance: any): void;
//         }
//     }
// }

// export { };
