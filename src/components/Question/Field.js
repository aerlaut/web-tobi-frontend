import React, { useMemo } from 'react'

import Text from './Text'
import ShortAnswer from './ShortAnswer'

export default function ({ type = 'text', content = '' }) {
  if (type === 'text') {
    return <Text content={content} />
  } else if (type === 'answer') {
    switch (content.type) {
      case 'short_text':
        return <ShortAnswer content={content} />
    }
  }
}
