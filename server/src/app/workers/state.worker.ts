import { dependency } from "@foal/core";
import { SensiboResource } from "../resource/sensibo.resource";
import { DEVICE_PROTOCOL, DEVICE_TYPE, Device, MEASURE_TYPE, Measure } from "../entities";
import { Room } from "../entities/room.entity";

export class StateWorker {
    @dependency
    sensiboResource: SensiboResource;

    start() {
        this.handleInterval()
        setInterval(this.handleInterval, 60000)
    }

    handleInterval = async () => {
        await this.fetchDevices();
        const sensibos = await Device.findBy({
            type: DEVICE_TYPE.AIRCON,
            protocol: DEVICE_PROTOCOL.SENSIBO
        });

        for (const sensibo of sensibos) {
            await this.measure(sensibo);
        }
    }

    async fetchDevices() {
        const sensiboDevices = await this.sensiboResource.devices();
        console.log(sensiboDevices)
        for (const sensiboDevice of sensiboDevices) {
            const exists = await Device.findOneBy({ uri: sensiboDevice.id });
            if (!exists) {
                let room = await Room.findOneBy({ reference: sensiboDevice.room.uid });
                if (!room) {
                    room = new Room();
                    room.label = sensiboDevice.room.name;
                    room.reference = sensiboDevice.room.uid;
                    await room.save();
                }
                room = await Room.findOneBy({ reference: sensiboDevice.room.uid });
                const device = new Device();
                device.label = sensiboDevice.room.name;
                device.meta = sensiboDevice;
                device.protocol = DEVICE_PROTOCOL.SENSIBO;
                device.room_id = (room as any).id;
                device.type = DEVICE_TYPE.AIRCON;
                device.uri = sensiboDevice.id;
                await device.save();
            }
        }
    }



    async measure(sensibo: Device) {
        console.log("MEasuring", sensibo)
        const state = await this.sensiboResource.pod_measurement(sensibo.uri);
        console.log(state);
        console.log(JSON.stringify(state, null, 2))
        if (state) {
            Measure.save({
                meta: state,
                device_id: sensibo.id,
                type: MEASURE_TYPE.HUMIDITY,
                value: Number(state.humidity)
            })
        }
    }
}