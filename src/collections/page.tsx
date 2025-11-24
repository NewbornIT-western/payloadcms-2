import { CollectionConfig } from 'payload'
import HeroBlock from '../Blocks/HeroBlock'
import ContentBlock from '../Blocks/ContentBlock'
import FormBlock from '../Blocks/FormBlock'
import MapBlock from '../Blocks/MapBlock'

const Pages: CollectionConfig = {
  slug: 'pages',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [HeroBlock, ContentBlock, FormBlock, MapBlock],
    },
  ],
}
export default Pages
