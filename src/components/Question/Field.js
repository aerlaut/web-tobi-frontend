import React, { useMemo } from 'react'

import TextLabel from './TextLabel'
import ShortTextAnswer from './ShortTextAnswer'
import TextAnswer from './TextAnswer'

export default function ({ type = 'text', content = '', idx }) {


  switch(type) {

    case 'text_label' :
      return <TextLabel content={content} idx={idx}/>
      break;

    case 'text_answer' :
      return <TextAnswer content={content} idx={idx}/>
      break;

    case 'short_text_answer' :
      return <ShortTextAnswer content={content} idx={idx} />
      break;

  }
}
