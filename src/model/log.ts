const Log_operationStateValue = ['IDLE', 'ANTENNA_DEPLOYED', 'LOW_POWER', 'HELLO_WORLD'] as const
const Log_satEventHistoryValue = ['ANTENNA_DEPLOYED', 'INITIAL_FLASH', 'BATTERY_CHARGED'] as const
const Log_obcValue = ['FAILED', 'DEGRADED', 'OPERATIONAL'] as const


export type Log_operationState = (typeof Log_operationStateValue)[number]
export type Log_satEventHistory = (typeof Log_satEventHistoryValue)[number]
export type Log_obc = (typeof Log_obcValue)[number]

export type Log = {
    callsign: string
    timestamp: number
    operationState: Log_operationState
    errorCount: number
    batteryVoltage: number
    batteryCurrent: number
    batteryTemp: number
    chargingVoltage: number
    isCharging: boolean
    panelVoltage: number | null
    panelCurrent: number | null
    satEventHistory: Log_satEventHistory | null
    lat: number
    lon: number
    alt: number
    themistor1: number
    themistor2: number
    themistor3: number
    themistor4: number
    obc: Log_obc
}