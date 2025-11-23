import { Page } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'

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

      <a
        href={block.ctabuttonText?.url || '#'}
        style={{
          display: 'inline-block',
          padding: '10px 24px',
          backgroundColor: '#007bff',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px',
        }}
      >
        {block.ctabuttonText?.text || 'Click Here'}
      </a>
    </div>
  )
}
