import React, { useMemo } from 'react'

import Text from './Text'
import ShortText from './ShortText'

export default function ({ type = 'text', content = '', idx }) {


  switch(type) {

    case 'question_text' :
      return <Text content={content} idx={idx}/>
      break;

    case 'answer_short_text' :
      return <ShortText content={content} idx={idx} />
      break;

  }
}
