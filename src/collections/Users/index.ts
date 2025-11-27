import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    tokenExpiration: 12 * 60 * 60,
    verify: true,
    cookies: {
      sameSite: 'Lax',
      secure: process.env.NODE_ENV === 'production',
      domain: process.env.NODE_ENV === 'production' ? 'localhost' : undefined,
    },
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => {
      if ((user as any)?.roles?.includes('admin')) {
        return true
      }
      return {
        id: {
          equals: user?.id,
        },
      }
    },
  },
  fields: [],
}
