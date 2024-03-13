import { dependency } from "@foal/core"
import { EnvConfig } from "../util/config";
import axios from 'axios';

const _SERVER = 'https://home.sensibo.com/api/v2'

export interface SensiboDevice {
    id: 'jtY8Jynf',
    room: SensiboRoom
}
export interface SensiboRoom {
    uid: 'PvKRLwoB',
    name: 'Living room',
    icon: 'Livingroom',
    pureBoostConfig: null
}
export interface SensiboMeasurement {
    time: { time: '2024-03-12T06:33:25.294739Z', secondsAgo: 65 },
    temperature: 27.3,
    humidity: 73.2,
    feelsLike: 29.7,
    rssi: -40,
    motion: false,
    roomIsOccupied: null,
    tvoc: 727,
    co2: 991,
    iaq: 111
}
export class SensiboResource {

    @dependency
    envConfig: EnvConfig;


    async _get(path: string, params: any = {}) {
        params['apiKey'] = this.envConfig.sensiboApiKey()

        const response = await axios.get(_SERVER + path, { params })
        return response.data
    }

    async _patch(path: string, data: any, params: any = {}) {
        params['apiKey'] = this.envConfig.sensiboApiKey()
        const response = await axios.patch(_SERVER + path, data, { params })
        return response.data
    }

    async devices(): Promise<Array<SensiboDevice>> {
        const response = await this._get("/users/me/pods", { fields: "id,room" })
        return response['result']
    }

    async pod_measurement(podUid): Promise<SensiboMeasurement | undefined> {
        const result = await this._get(`/pods/${podUid}/measurements`)
        return result['result'][0]
    }

    async pod_ac_state(podUid) {
        const result = await this._get(`/pods/${podUid}/acStates`, { limit: 1, fields: "acState" })
        return result['result'][0]['acState']
    }

    pod_change_ac_state(podUid, currentAcState, propertyToChange, newValue) {
        return this._patch(`/pods/${podUid}/acStates/${propertyToChange}`,
            { 'currentAcState': currentAcState, 'newValue': newValue })
    }
}