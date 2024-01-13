import { RefObject, useEffect, useRef } from 'react'

import { useIsomorphicLayoutEffect } from '@/hooks'

// MediaQueryList Event based useEventListener interface
function useEventListener<EV,K extends keyof MediaQueryListEventMap>(
  eventName: K,
  handler: (event: EV extends Event ? EV : MediaQueryListEventMap[K]) => void,
  element: RefObject<MediaQueryList>,
  options?: boolean | AddEventListenerOptions,
): void

// Window Event based useEventListener interface
function useEventListener<EV, K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: EV extends Event ? EV : WindowEventMap[K] ) => void,
  element?: undefined,
  options?: boolean | AddEventListenerOptions,
): void

// Element Event based useEventListener interface
function useEventListener<EV,
  K extends keyof HTMLElementEventMap,
  T extends HTMLElement = HTMLDivElement,
>(
  eventName: K,
  handler: (event: EV extends Event ? EV : HTMLElementEventMap[K] ) => void,
  element: RefObject<T>,
  options?: boolean | AddEventListenerOptions,
): void

// Document Event based useEventListener interface
function useEventListener<EV ,K extends keyof DocumentEventMap>(
  eventName: K,
  handler: (event: EV extends Event ? EV : DocumentEventMap[K] ) => void,
  element: RefObject<Document>,
  options?: boolean | AddEventListenerOptions,
): void

function useEventListener<
  EV ,
  KW extends keyof WindowEventMap,
  KH extends keyof HTMLElementEventMap,
  KM extends keyof MediaQueryListEventMap,
  T extends HTMLElement | MediaQueryList | void = void,
>(
  eventName: KW | KH | KM,
  handler: (
    event: EV extends Event ? EV : 
      | WindowEventMap[KW]
      | HTMLElementEventMap[KH]
      | MediaQueryListEventMap[KM]
      | Event,
  ) => void,
  element?: RefObject<T>,
  options?: boolean | AddEventListenerOptions,
) {
  // Create a ref that stores handler
  const savedHandler = useRef(handler)

  useIsomorphicLayoutEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    // Define the listening target
    const targetElement: T | Window = element?.current ?? window

    if (!(targetElement && targetElement.addEventListener)) return

    // Create event listener that calls handler function stored in ref
    const listener: typeof handler = event => savedHandler.current(event)

    //@ts-ignore
    targetElement.addEventListener(eventName, listener , options)

    // Remove event listener on cleanup
    return () => {
      //@ts-ignore
      targetElement.removeEventListener(eventName, listener , options)
    }
  }, [eventName, element, options])
}

export { useEventListener }