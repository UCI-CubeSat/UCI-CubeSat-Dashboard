import { ParsedLog } from "@/model/log"

type Props = {
    logs: Array<ParsedLog>
}
// This component should show batteryVoltage, batteryCurrent, batteryTemp, chargingVoltage, and isCharging
export default function Battery(props: Props) {
    const { logs } = props
    return <p>Battery</p>
}