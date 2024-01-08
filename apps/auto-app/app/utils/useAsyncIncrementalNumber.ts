import React from "react"

export function useAsyncIncrementalNumber(
  asyncFunction: () => Promise<void>,
  delay: number | undefined = 200,
): number {
  const [incrementalNumber, setIncrementalNumber] = React.useState<number>(0.01)

  React.useEffect(() => {
    let isMounted = true

    const timer = setInterval(() => {
      setIncrementalNumber((prevNumber) => {
        const nextNumber = prevNumber + 0.01
        return nextNumber <= 1 ? nextNumber : 1
      })
    }, delay)
    asyncFunction()
      .then(() => {
        if (isMounted) {
          setIncrementalNumber(1)
        }
        clearInterval(timer)
      })
      .catch(() => {
        clearInterval(timer)
      })

    return () => {
      isMounted = false
      clearInterval(timer)
    }
  }, [delay])

  return incrementalNumber
}
