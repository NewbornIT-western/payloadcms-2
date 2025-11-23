import { Block } from 'payload'

const FormBlock: Block = {
  slug: 'form',
  fields: [
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
  ],
}

export default FormBlock
