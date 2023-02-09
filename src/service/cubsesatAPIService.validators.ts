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