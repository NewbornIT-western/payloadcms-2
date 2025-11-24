import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'
import HeroBlock from './components/HeroBlock'
import ContentBlock from './components/ContentBlock'
import FormBlock from './components/FormBlock'
import MapBlock from './components/MapBlock'

import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  await payload.auth({ headers })

  const {
    docs: [page],
  } = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'landing-page',
      },
    },
  })

  if (!page) {
    return <div>Page not found</div>
  }

  const renderBlocks = (blocks: typeof page.layout) => {
    return blocks?.map(async (block, index: number) => {
      switch (block.blockType) {
        case 'hero':
          return <HeroBlock key={index} block={block} />
        case 'content':
          return <ContentBlock key={index} block={block} />
        case 'form':
          return <FormBlock key={block.id} block={block} />
        case 'map':
          return <MapBlock key={index} block={block} />
        default:
          return null
      }
    })
  }

  return <div suppressHydrationWarning>{renderBlocks(page.layout)}</div>
}
