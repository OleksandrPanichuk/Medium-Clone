import { useEventListener } from '@/hooks'
import { RefObject, useEffect, useRef, useCallback } from 'react'

type ListenerEvent = MouseEvent & {
	target: Element
}


export const useClickOutside = (
	ref: RefObject<HTMLElement>,
	contentRef: RefObject<HTMLElement>,
	callback: (event: MouseEvent) => void
) => {
	const handlerRef = useRef(callback)

	useEffect(() => {
		handlerRef.current = callback
	})
	
		const listener = useCallback((event: ListenerEvent) => {
			if (ref && ref.current && contentRef && contentRef.current) {
				if (event.target.shadowRoot) {
					if (
						!event.target.shadowRoot.contains(ref.current) &&
						!event.target.shadowRoot.contains(contentRef.current)
					) {
						handlerRef.current(event)
					}
				} else {
					if (
						!ref.current.contains(event.target) &&
						!contentRef.current.contains(event.target)
					) {
						handlerRef.current(event)
					}
				}
			}
		},[ref, contentRef])

		useEventListener('click', listener)
		useEventListener('touchstart', listener)
}

