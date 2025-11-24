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
      defaultValue: 10.762622,
    },
    {
      name: 'longitude',
      type: 'number',
      label: 'Longitude',
      required: true,
      defaultValue: 106.660172,
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
  ],
}

export default MapBlock
