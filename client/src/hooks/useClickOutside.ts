
import { RefObject, useCallback, useEffect, useRef } from 'react';
import { useEventListener } from '.';

type ListenerEvent = MouseEvent & {
  target: Element;
};

export const useClickOutside = (
  ref: RefObject<HTMLElement>,
  callback: (event: MouseEvent) => void,
) => {
  const handlerRef = useRef(callback);


  useEffect(() => {
    handlerRef.current = callback;
  });


  const listener = useCallback((event:ListenerEvent) => {
    if (ref && ref.current) {
      if (event.target.shadowRoot) {
        if (!event.target.shadowRoot.contains(ref.current)) {
          handlerRef.current(event);
        }
      } else {
        if (!ref.current.contains(event.target)) {
          handlerRef.current(event);
        }
      }
    }
  }, [ref])

  useEventListener('click', listener)
  useEventListener('touchstart',listener)
};

