import { ParsedLog } from "@/model/log"

type Props = {
    logs: Array<ParsedLog>
}
// This component should show panelVoltage and panelCurrent
export default function Panel(props: Props) {
    const { logs } = props
    return <p>Panel</p>
}