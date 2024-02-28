import { findByIds } from 'usb';
import { USB } from './Util.js';
import AMBX from './classes/AMBX.js';

export async function CreateDevice(vendorId = USB.VID, productId = USB.PID) {
  const device = findByIds(vendorId, productId);

  if (!device) throw new Error('No USB device found');

  return new AMBX(device);
}

export { AMBX };
export * from './Util.js';
