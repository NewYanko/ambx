import { Device, Endpoint } from 'usb';
import { Command, Commands, Light, Lights, USB } from '../Util.js';
import { EventEmitter } from 'node:events';

const ArrayLights = Object.keys(Lights).map(l => Lights[l]);
const RealArrayLights = ArrayLights.filter(l => l != Lights.All);

export default class AMBX extends EventEmitter {
  USB: Device;
  Endpoint: Endpoint;
  _wasCloseEmitted = false;
  /**
   * USB Connection and Methods
   * @param {Device} USBInstance
   */
  constructor(USBInstance: Device) {
    super();
    this.USB = USBInstance;
    this.USB.open();
    const inter = this.USB.interface(0);
    try {
      inter.claim();
    } catch (e) {
      throw new Error('Unable to claim interface - is device busy?');
    }
    const end = inter.endpoint(USB.Endpoints.OUT);
    if (!end) throw new Error('Unable to get USB endpoint');
    this.Endpoint = end;
  }

  async Write(Light: Light, Data: [Command, ...any]): Promise<boolean> {
    return new Promise(res => {
      try {
        this.Endpoint.makeTransfer(0, () => res(true)).submit(Buffer.from([Commands.Header, Light, ...Data]));
      } catch (e) {
        if (!this._wasCloseEmitted) {
          this.emit('close');
          this._wasCloseEmitted = true;
        }
        res(false);
        console.log('amBX Error Transferring (probably closed pipe)', e);
      }
    });
  }

  async SetColor(SelLights: Light | Light[] = Lights.All, Red: number, Green: number, Blue: number) {
    if (!Array.isArray(SelLights))
      if (ArrayLights.includes(SelLights)) SelLights = SelLights == Lights.All ? RealArrayLights : [SelLights];
      else throw new Error('Invalid light');

    for (const Light of SelLights) {
      //console.log("Setting light", Light, "[", Red, Green, Blue, "]");
      await this.Write(Light, [Commands.SetColor, Red, Green, Blue]);
    }
  }

  Close() {
    if (!this._wasCloseEmitted) {
      this.emit('close');
      this._wasCloseEmitted = true;
    }
    return this.USB.close();
  }
}
