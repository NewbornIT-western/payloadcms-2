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

  useEffect(() => {
    if (!mapboxToken || !mapContainer.current || map.current) return

    mapboxgl.accessToken = mapboxToken

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [block.longitude || 106.660172, block.latitude || 10.762622],
      zoom: block.zoom || 12,
    })

    // Add navigation controls (zoom +/-, compass, rotate)
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')

    // Add fullscreen control
    map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right')

    // Add scale control
    map.current.addControl(new mapboxgl.ScaleControl(), 'bottom-left')

    // Add geolocate control (find my location)
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
      .setLngLat([block.longitude || 106.660172, block.latitude || 10.762622])
      .addTo(map.current)

    if (block.heading) {
      const popup = new mapboxgl.Popup({ offset: 25 }).setText(block.heading)
      marker.setPopup(popup)
    }

    return () => {
      map.current?.remove()
    }
  }, [mapboxToken, block.longitude, block.latitude, block.zoom, block.heading])

  if (!mapboxToken) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
        <p>Mapbox token is missing. Please add NEXT_PUBLIC_MAPBOX_TOKEN to your .env file.</p>
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
