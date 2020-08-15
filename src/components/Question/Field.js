import React, { useMemo } from 'react'

import Text from './Text'
import ShortText from './ShortText'

export default function ({ type = 'text', content = '', idx }) {
  if (type === 'text') {
    return <Text content={content} />
  } else if (type === 'answer') {
    switch (content.type) {
      case 'short_text':
        return <ShortText content={content} idx={idx} />
    }
  }
}
