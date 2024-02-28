# amBX

Node.JS wrapper for AMBX's and Philips' gaming lights.

![amBX speakers and wallwasher](https://github.com/NewYanko/amBX/raw/main/media/ambx.webp) _© Koninklijke Philips N.V. All image rights reserved_

# Installation & Requirements

Install using [NPM](https://www.npmjs.com/package/ambx)

```console
npm i ambx
```

This package uses [node-usb](https://github.com/node-usb/node-usb), make sure to have libusb installed.

# Getting Started

To create a new instance, use

```js
import { CreateDevice, Lights } from 'ambx';

(async () => {
    try {
        // Create instance. Will throw if no amBX device is found
        const myAMBX = await CreateDevice();
        // Set the center wallwasher to red
        await myAMBX.SetColor(Lights.WallCenter, 255, 0, 0);
    } catch (e) {
        console.log('Something went wrong:', e);
    }
})();
```

# Methods

tbd
