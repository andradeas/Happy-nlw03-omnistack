import { CONTEXT_VERSION, LeafletProvider } from '@react-leaflet/core';
import { Map as LeafletMap } from 'leaflet';
import React, { useEffect, useMemo, useRef, useState } from 'react';
export function useMapElement(mapRef, props) {
  const [map, setMap] = useState(null);
  useEffect(() => {
    if (mapRef.current !== null && map === null) {
      const instance = new LeafletMap(mapRef.current, props);

      if (props.center != null && props.zoom != null) {
        instance.setView(props.center, props.zoom);
      } else if (props.bounds != null) {
        instance.fitBounds(props.bounds, props.boundsOptions);
      }

      if (props.whenReady != null) {
        instance.whenReady(props.whenReady);
      }

      setMap(instance);
    }
  }, [mapRef, map, props]);
  return map;
}
export function MapContainer({
  children,
  className,
  id,
  placeholder,
  style,
  whenCreated,
  ...options
}) {
  const mapRef = useRef(null);
  const map = useMapElement(mapRef, options);
  const createdRef = useRef(false);
  useEffect(() => {
    if (map != null && createdRef.current === false && whenCreated != null) {
      createdRef.current = true;
      whenCreated(map);
    }
  }, [map, whenCreated]);
  const context = useMemo(() => map ? {
    __version: CONTEXT_VERSION,
    map
  } : null, [map]);
  const contents = context ? /*#__PURE__*/React.createElement(LeafletProvider, {
    value: context
  }, children) : placeholder != null ? placeholder : null;
  return /*#__PURE__*/React.createElement("div", {
    ref: mapRef,
    className: className,
    id: id,
    style: style
  }, contents);
}