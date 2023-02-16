import { z } from 'zod'

export const getPredictionValidator = z.record(z.string(), z.object({
    duration: z.number(),
    interval: z.array(z.string()),
    rise: z.string(),
    set: z.string()
}))
export type getPredictionResponse = z.infer<typeof getPredictionValidator>
export const getAvailableSatelliteValidator = z.array(z.string())
export type getAvailableSatelliteResponse = z.infer<typeof getAvailableSatelliteValidator>
export const getPathValidator = z.object({
    latLng: z.object({
        lat: z.number(),
        lng: z.number()
    }),
    latLngPath: z.array(z.tuple([
        z.number(),
        z.number()
    ])),
    latPath: z.array(z.number()),
    lngPath: z.array(z.number())
})
export type getPathResponse = z.infer<typeof getPathValidator>


const operationStates = ["LOW_POWER", "ANTENNA_DEPLOYED", "IDLE", "HELLO_WORLD"] as const
const obc = ["OPERATIONAL", "FAILED", "DEGRADED"] as const
const satelliteEventHistory = ["ANTENNA_DEPLOYED", "BATTERY_CHARGED", "INITIAL_FLASH"] as const

const LowPowerLogValidator = z.object({
    operationState: z.literal(operationStates[0]),
    panelVoltage: z.null(),
    panelCurrent: z.null(),
    satEventHistory: z.null(),
})

const NormalPowerLogValidator = z.object({
    operationState: z.union([
        z.literal(operationStates[1]),
        z.literal(operationStates[2]),
        z.literal(operationStates[3])
    ]),
    panelVoltage: z.number(),
    panelCurrent: z.number(),
    satEventHistory: z.union([
        z.literal(satelliteEventHistory[0]),
        z.literal(satelliteEventHistory[1]),
        z.literal(satelliteEventHistory[2])
    ]),
})

const BaseLogValidator = z.object({
    id: z.number(),
    callsign: z.string(),
    timestamp: z.number(),
    errorCount: z.number(),
    batteryVoltage: z.number(),
    batteryCurrent: z.number(),
    batteryTemp: z.number(),
    chargingVoltage: z.number(),
    isCharging: z.boolean(),
    lat: z.number(),
    lon: z.number(),
    alt: z.number(),
    themistor1: z.number(),
    themistor2: z.number(),
    themistor3: z.number(),
    themistor4: z.number(),
    obc: z.union([z.literal(obc[0]), z.literal(obc[1]), z.literal(obc[2])])
})

export const ParsedLogValidator = z.union(
    [
        BaseLogValidator.merge(LowPowerLogValidator),
        BaseLogValidator.merge(NormalPowerLogValidator)
    ]
)
export type ParsedLog = z.infer<typeof ParsedLogValidator>