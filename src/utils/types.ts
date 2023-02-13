/**
 * @see {@link https://github.com/aaronpk/webmention.io/blob/main/helpers/formats.rb#L3}
 */
export type Mention = {
  source: string
  verified: boolean
  verified_date: string
  id: number
  private: boolean
  data: {
    author: {
      name: string
      url: string | null
      photo: string | null
    }
    url: string
    name: string | null
    content: string | null
    published: string | null
    published_ts: number | null
    rsvp?: 'yes' | 'no' | 'maybe'
    swarm_coins?: number
  }
  activity: {
    /**
     * Activity type.
     * @see {@link https://github.com/aaronpk/webmention.io/blob/main/models/link.rb#L165}
     * @see {@link https://github.com/aaronpk/webmention.io/blob/main/helpers/webmention_processor.rb#L362}
     */
    type: 'repost' | 'like' | 'reply' | 'bookmark' | 'rsvp' | 'invite' | 'link'
    sentence: string
    sentence_html: string
  }
  relcanonical?: string
  target: string
}

export type Mentions = {
  links: Mention[]
}
