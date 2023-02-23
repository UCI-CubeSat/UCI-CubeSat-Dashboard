import { ParsedLog } from "@/model/log"

type Props = {
    logs: Array<ParsedLog>
}
// This component should show themistor1, themistor2, themistor3, and themistor4
export default function Temperature(props: Props) {
    const { logs } = props
    return <p>Temperature</p>
}