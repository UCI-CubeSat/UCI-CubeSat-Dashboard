const convertToStringMap = (map: Record<string, unknown>) => {
    const stringMap: Record<string, string> = {}
    for (const key in map) {
        stringMap[key] = `${map[key]}`
    }
    return stringMap
}

export const getQueryParamsGivenSearch = (search: string) => {
    const searchParams = new URLSearchParams(search)
    const queryParams: Record<string, string> = {}
    searchParams.forEach((value, key) => {
        queryParams[key] = value
    })
    return queryParams
}

export const encodeGetParams = <T extends Record<string, unknown>>(queryParamsMap: T) =>
    Object.entries(convertToStringMap(queryParamsMap)).map(kv => kv.map(encodeURIComponent).join("=")).join("&");


