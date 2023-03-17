import { TextField, TextFieldProps } from "@mui/material";
import moment from "moment";
import { useState } from "react";

const createMomentObjectUsingDateTime = (dateTimeString: string) => {

    if (dateTimeString === "") {
        return null
    }
    const dateTime = moment(dateTimeString)
    if (dateTime.isValid()) {
        return dateTime
    }
    else {
        return null
    }
}

const momentToString = (dateTime: moment.Moment | null | undefined) => {
    if (dateTime) {
        return dateTime.format("YYYY-MM-DDTHH:mm")
    }
    else {
        return ""
    }
}

type Override<T1, T2> = Omit<T1, keyof T2> & T2;

type Props = Override<TextFieldProps, {
    onChange?: (arg0: moment.Moment | null) => void
    value?: moment.Moment | null
}>
export default function DateTimeField(props: Props) {
    const [dateTimeString, setDateTimeString] = useState(momentToString(props.value))

    return (
        <TextField
            {...props}
            type="datetime-local"
            onChange={(e) => {
                setDateTimeString(e.target.value)
                if (props.onChange) {
                    props.onChange(createMomentObjectUsingDateTime(e.target.value))
                }
            }}
            value={dateTimeString}
        />
    )
}