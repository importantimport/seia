import type { Mention } from './types.ts'

export const reduce = (links: Mention[]) =>
  links
    .filter(({ data }) => data.author?.name)
    .reduce(
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
