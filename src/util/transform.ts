import moment from "moment"

export const NUMBER_TO_DATETIME_PATTERN = 'M/D/YYYY, h:mm:ss a' as const
export const transformNumberToDate = (timeStampInSeconds: number | string | null) => {
    if (timeStampInSeconds === null || typeof timeStampInSeconds === "string") {
        return "Invalid date"
    }
    else {
        return moment(timeStampInSeconds * 1000).format(NUMBER_TO_DATETIME_PATTERN)
    }
}