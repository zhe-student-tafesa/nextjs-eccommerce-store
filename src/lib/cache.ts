
// for dealing with data cache and everything else built into nextjs
import { unstable_cache as nextCache } from "next/cache"

// for request memorization
import { cache as reactCache } from "react"


type Callback = (...args: any[]) => Promise<any>

export function cache<T extends Callback>(
    cb: T,
    keyParts: string[],
    // = {} means that if the cache function is called without passing the options parameter, it will default to an empty object {}
    options: {
        revalidate?: number | false;
        // tags is optional
        tags?: string[]
    } = {}
) {
    return nextCache(reactCache(cb), keyParts, options)
}