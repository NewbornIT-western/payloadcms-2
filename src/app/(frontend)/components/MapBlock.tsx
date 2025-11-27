'use client'
import { Page } from '@/payload-types'
import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

type MapProps = Extract<NonNullable<Page['layout']>[number], { blockType: 'map' }>

export default function MapBlock({ block }: { block: MapProps }) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
  
  // Use custom style if provided, otherwise use selected style
  const mapStyle = block.customMapStyle || block.mapStyle || 'mapbox://styles/mapbox/outdoors-v12'

  useEffect(() => {
    if (!mapboxToken || !mapContainer.current || map.current) return

    mapboxgl.accessToken = mapboxToken

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: mapStyle,
      center: [block.longitude || 105.774305, block.latitude || 10.036728],
      zoom: block.zoom || 12,
    })
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')

    map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right')

    map.current.addControl(new mapboxgl.ScaleControl(), 'bottom-left')

    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
        showUserHeading: true,
      }),
      'top-right',
    )

    // Add marker with popup
    const marker = new mapboxgl.Marker({ color: 'red' })
      .setLngLat([block.longitude || 105.774305, block.latitude || 10.036728])
      .addTo(map.current)

    if (block.heading) {
      const popup = new mapboxgl.Popup({ offset: 25 }).setText(block.heading)
      marker.setPopup(popup)
    }


    map.current.on('load', () => {
      if (!map.current) return

      if (block.enableTerrain !== false) {
        map.current.addSource('mapbox-dem', {
          type: 'raster-dem',
          url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
          tileSize: 512,
          maxzoom: 14,
        })
        map.current.setTerrain({ source: 'mapbox-dem', exaggeration: 3 })
      }

      if (block.enable3DBuildings !== false) {
        const layers = map.current.getStyle().layers || []
        let labelLayerId: string | undefined
        for (const layer of layers) {
          const layout = layer.layout as Record<string, unknown> | undefined
          if (layer.type === 'symbol' && layout && 'text-field' in layout && layout['text-field']) {
            labelLayerId = layer.id
            break
          }
        }

        map.current.addLayer(
          {
            id: '3d-buildings',
            source: 'composite',
            'source-layer': 'building',
            filter: ['==', ['get', 'extrude'], 'true'],
            type: 'fill-extrusion',
            minzoom: 14,
            paint: {
              'fill-extrusion-color': [
                'interpolate',
                ['linear'],
                ['get', 'height'],
                0,   '#4b5563',
                20,  '#3b82f6',
                50,  '#22c55e',
                100, '#eab308',
                200, '#ef4444'
              ],
              'fill-extrusion-height': ['get', 'height'],
              'fill-extrusion-base': ['get', 'min_height'],
              'fill-extrusion-opacity': 0.85,
            },
          } as any,
          labelLayerId,
        )

        // Click event to get building data
        map.current.on('click', '3d-buildings', (e) => {
          if (!e.features || e.features.length === 0) return
          
          const feature = e.features[0]
          const properties = feature.properties
          
          console.log('🏢 Building Data:', {
            height: properties?.height,
            minHeight: properties?.min_height,
            type: properties?.type,
            name: properties?.name,
            allProperties: properties,
            geometry: feature.geometry,
            coordinates: e.lngLat,
          })

          // Show popup with building info
          new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`
              <div style="padding: 10px; max-width: 250px;">
                <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">
                  ${properties?.name || 'Building'}
                </h3>
                <p style="margin: 4px 0; font-size: 12px;">
                  <strong>Height:</strong> ${properties?.height || 'N/A'}m
                </p>
                <p style="margin: 4px 0; font-size: 12px;">
                  <strong>Base:</strong> ${properties?.min_height || 0}m
                </p>
                <p style="margin: 4px 0; font-size: 12px;">
                  <strong>Type:</strong> ${properties?.type || 'N/A'}
                </p>
              </div>
            `)
            .addTo(map.current!)
        })

        // Change cursor on hover
        map.current.on('mouseenter', '3d-buildings', () => {
          if (map.current) map.current.getCanvas().style.cursor = 'pointer'
        })

        map.current.on('mouseleave', '3d-buildings', () => {
          if (map.current) map.current.getCanvas().style.cursor = ''
        })
      }

      // Click anywhere to get terrain elevation
      map.current.on('click', (e) => {
        if (!map.current) return

        const elevation = map.current.queryTerrainElevation(e.lngLat, { exaggerated: false })
        
        console.log('⛰️ Terrain Data:', {
          coordinates: e.lngLat,
          elevation: elevation ? `${elevation.toFixed(2)}m` : 'N/A',
          lat: e.lngLat.lat,
          lng: e.lngLat.lng,
        })
      })
    })

    return () => {
      map.current?.remove()
    }
  }, [mapboxToken, block.longitude, block.latitude, block.zoom, block.heading, mapStyle, block.enable3DBuildings, block.enableTerrain])

  if (!mapboxToken) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
        <p>Mapbox token is missing</p>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '20px' }}>
      {block.heading && <h2 style={{ marginBottom: '20px' }}>{block.heading}</h2>}
      <div
        ref={mapContainer}
        style={{
          width: '100%',
          height: block.height || 400,
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      />
    </div>
  )
}
