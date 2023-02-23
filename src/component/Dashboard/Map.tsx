import { ParsedLog } from "@/model/log"

type Props = {
    logs: Array<ParsedLog>
}
// This component should show lat, lon, and alt
export default function Map(props: Props) {
    const { logs } = props
    return <p>Map</p>
}