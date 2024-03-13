// App
import { DEVICE_PROTOCOL, DEVICE_TYPE, Device } from '../app/entities';
import { dataSource } from '../db';

export async function main() {
  await dataSource.initialize();
  try {
    const device = new Device();
    device.label = '';
    device.protocol = DEVICE_PROTOCOL.SENSIBO;
    device.type = DEVICE_TYPE.AIRCON;
    device.uri = '';

    console.log(await device.save());
  } catch (error: any) {
    console.error(error.message);
  } finally {
    await dataSource.destroy();
  }
}
