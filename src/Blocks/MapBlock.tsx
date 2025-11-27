import type { Block } from 'payload'

const MapBlock: Block = {
  slug: 'map',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
    },
    {
      name: 'latitude',
      type: 'number',
      label: 'Latitude',
      required: true,
      defaultValue: 10.036728,
    },
    {
      name: 'longitude',
      type: 'number',
      label: 'Longitude',
      required: true,
      defaultValue: 105.774305,
    },
    {
      name: 'zoom',
      type: 'number',
      label: 'Zoom Level',
      defaultValue: 12,
      min: 1,
      max: 20,
    },
    {
      name: 'height',
      type: 'number',
      label: 'Height (px)',
      defaultValue: 400,
    },
    {
      name: 'mapStyle',
      type: 'select',
      label: 'Map Style',
      required: true,
      defaultValue: 'outdoors',
      options: [
        {
          label: 'Dark',
          value: 'mapbox://styles/mapbox/dark-v11',
        },
        {
          label: 'Light',
          value: 'mapbox://styles/mapbox/light-v11',
        },
        {
          label: 'Streets',
          value: 'mapbox://styles/mapbox/streets-v12',
        },
        {
          label: 'Outdoors',
          value: 'mapbox://styles/mapbox/outdoors-v12',
        },
        {
          label: 'Satellite',
          value: 'mapbox://styles/mapbox/satellite-streets-v12',
        },
        {
          label: 'Navigation Day',
          value: 'mapbox://styles/mapbox/navigation-day-v1',
        },
        {
          label: 'Navigation Night',
          value: 'mapbox://styles/mapbox/navigation-night-v1',
        },
      ],
    },
    {
      name: 'customMapStyle',
      type: 'text',
      label: 'Custom Map Style URL (Optional)',
      admin: {
        description: 'Enter a custom Mapbox style URL (e.g., mapbox://styles/username/style-id). This will override the style selected above.',
      },
    },
    {
      name: 'enable3DBuildings',
      type: 'checkbox',
      label: 'Enable 3D Buildings',
      defaultValue: true,
      admin: {
        description: 'Show 3D buildings on the map (requires zoom level 15+)',
      },
    },
    {
      name: 'enableTerrain',
      type: 'checkbox',
      label: 'Enable 3D Terrain',
      defaultValue: false,
      admin: {
        description: 'Show 3D terrain elevation on the map',
      },
    },
  ],
}

export default MapBlock
