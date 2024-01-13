
import { useEffect, useState } from 'react';


const getInitialState = (query: string, defaultState?: boolean) => {
  // Prevent a React hydration mismatch when a default value is provided by not defaulting to window.matchMedia(query).matches.
  if (defaultState !== undefined) {
    return defaultState;
  }

  if (typeof window !== 'undefined') {
    return window.matchMedia(query).matches;
  }

  // A default value has not been provided, and you are rendering on the server, warn of a possible hydration mismatch when defaulting to false.
  if (process.env.NODE_ENV !== 'production') {
    console.warn(
      '`useMedia` When server side rendering, defaultState should be defined to prevent a hydration mismatches.'
    );
  }

  return false;
};

export const useMatchMedia = (query: string, defaultState?: boolean) => {
  const [state, setState] = useState(getInitialState(query, defaultState));

  useEffect(() => {
    let mounted = true;
    const mql = window.matchMedia(query);
    const onChange = () => {
      if (!mounted) {
        return;
      }
      setState(!!mql.matches);
    };

    mql.addListener(onChange);
    setState(mql.matches);

    return () => {
      mounted = false;
      mql.removeListener(onChange);
    };
  }, [query]);

  return state;
};


// type IMediaQuery = Array<string>
// type IMatchedMedia = Array<boolean>



// import { useLayoutEffect, useState } from 'react'

// export const useMatchMedia = (
// 	queries: IMediaQuery,
// 	defaultValues: IMatchedMedia = []
// ): IMatchedMedia => {
// 	const initialValues = defaultValues.length
// 		? defaultValues
// 		: Array(queries.length).fill(false)

// 	// Перевірка, чи код виконується в середовищі браузера
// 	const isBrowser = typeof window !== 'undefined'

// 	// Використання isBrowser для перевірки доступності window
// 	const mediaQueryLists = isBrowser
// 		? queries.map((q) => window.matchMedia(q))
// 		: []

// 	const getValue = (): IMatchedMedia => {
// 		// Перевірка наявності isBrowser перед використанням window
// 		const matchedQueries = isBrowser
// 			? mediaQueryLists.map((mql) => mql.matches)
// 			: initialValues

// 		return matchedQueries
// 	}

// 	// State and setter for matched value
// 	const [value, setValue] = useState(getValue)

// 	useLayoutEffect(() => {
// 		if (isBrowser) {
// 			const handler = (): void => setValue(getValue)
// 			mediaQueryLists.forEach((mql) => mql.addListener(handler))
// 			return (): void =>
// 				mediaQueryLists.forEach((mql) => mql.removeListener(handler))
// 		}
// 	}, [isBrowser])

// 	if (!isBrowser) return initialValues

// 	return value
// }
