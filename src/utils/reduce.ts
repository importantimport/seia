import type { Mention } from './types'

export const reduce = (links: Mention[]) =>
  links.reduce(
    (mentions, mention) => ({
      ...mentions,
      [mention.data.content ? 'content' : 'avatar']: [
        ...mentions[mention.data.content ? 'content' : 'avatar'],
        mention
      ]
    }),
    {
      avatar: [],
      content: []
    } as { [key: string]: Mention[] }
  )
