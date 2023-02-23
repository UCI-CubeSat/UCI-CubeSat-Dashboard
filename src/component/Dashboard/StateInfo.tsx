import { ParsedLog } from "@/model/log"

type Props = {
    logs: Array<ParsedLog>
}
// This component should show errorCount, obc ,operationState, and satEventHistory
export default function StateInfo(props: Props) {
    const { logs } = props
    return <p>State Info</p>
}