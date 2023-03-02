import moment from "moment"

export const NUMBER_TO_DATETIME_PATTERN = 'M/D/YYYY, h:mm:ss a' as const
export const transformNumberToDate = (value: number | string | null) => {
    if (value === null || typeof value === "string") {
        return "Invalid date"
    }
    else {
        return moment(value).format(NUMBER_TO_DATETIME_PATTERN)
    }
}