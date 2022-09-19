import {FC, memo, useEffect, useState} from 'react';

import {Loading} from '../loading';
import {MessageWrapper} from './styles';

import {Event, EventTypes, IMessageType} from '@/utils';

export interface IMessageProps {
  type?: IMessageType;
  content?: string;
  showTime?: number;
}

export const Message: FC<IMessageProps> = memo((props) => {
  // 默认显示时间
  const defaultTime = 4000;
  const [show, setshow] = useState(false);
  const [styleshow, setstyleshow] = useState(false);
  let [timer, setTimer] = useState<any>();
  let [styletimer, setstyleTimer] = useState<any>();
  const [messageParam, setmessageParam] = useState<IMessageProps>({
    type: props.type,
    content: props.content,
    showTime: props.showTime,
  });

  const getColor = (type?: IMessageType): string => {
    let color = '#049b24';
    if (type === IMessageType.ERROR) {
      color = '#FF6666';
    } else if (type === IMessageType.WARN) {
      color = '#e7c713';
    } else if (type === IMessageType.LOADING) {
      color = '#a4b1a6';
    }
    return color;
  };

  const onMessage = (param: IMessageProps) => {
    clearTimeout(timer);
    clearTimeout(styletimer);
    setshow(true);
    setstyleshow(true);
    setmessageParam(param);
    timer = setTimeout(() => {
      setshow(false);
      clearTimeout(timer);
    }, param.showTime || defaultTime);
    setTimer(timer);

    styletimer = setTimeout(() => {
      setstyleshow(false);
      clearTimeout(styletimer);
    }, (param.showTime || defaultTime) - 500);
    setstyleTimer(styletimer);
  };

  useEffect(() => {
    Event.addListener(EventTypes.Message, onMessage);
    return () => {
      Event.removeListener(EventTypes.Message, onMessage);
    };
  });

  return show ? (
    <MessageWrapper
      background={getColor(messageParam.type)}
      className={styleshow ? 'fadeIn' : 'fadeOut'}
    >
      {messageParam.type === IMessageType.LOADING ? (
        <>
          <Loading size='mini' />
          <span className='text'>{messageParam.content}</span>
        </>
      ) : (
        <span className='text'>{messageParam.content}</span>
      )}
    </MessageWrapper>
  ) : null;
});

Message.displayName = 'Message';
