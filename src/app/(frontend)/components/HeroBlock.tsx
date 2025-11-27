import { Page } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Button } from '@/components/ui/button'

type HeroProps = Extract<NonNullable<Page['layout']>[number], { blockType: 'hero' }>

export default function HeroBlock({ block }: { block: HeroProps }) {
  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '40px auto',
        padding: '30px',
        textAlign: 'center',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
      }}
    >
      <h1>{block.heading}</h1>

      {block.subheading && <RichText data={block.subheading} />}

      {typeof block?.image === 'object' && block.image?.url && (
        <img
          src={block.image.url}
          alt={block.image.alt || 'Hero Image'}
          style={{
            maxWidth: '100%',
            borderRadius: '6px',
            margin: '20px 0',
          }}
        />
      )}

      <Button asChild size="lg">
        <a href={block.ctabuttonText?.url || '#'}>
          {block.ctabuttonText?.text || 'Click Here'}
        </a>
      </Button>
    </div>
  )
}
