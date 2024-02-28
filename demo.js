import { CreateDevice, Lights } from './dist/main.js';

(async () => {
  var Device = await CreateDevice();
  const step = 10;
  const time = 50;
  const offsets = [5, 10];
  const offsetsb = [4, 8];

  var EndFlag = false;

  const loop = async () => {
    for (var x = 0; x < 255; x += step) {
      if (x > 255) x = 255;
      var offset = [x - step * offsets[0], x - step * offsets[1]].map(o => (o < 0 ? 0 : o));
      Device.SetColor(Lights.Left, offset[1], 0, 0);
      Device.SetColor(Lights.WallLeft, offset[0], 0, 0);
      Device.SetColor(Lights.WallCenter, x, 0, 0);
      Device.SetColor(Lights.WallRight, offset[0], 0, 0);
      Device.SetColor(Lights.Right, offset[1], 0, 0);
      await delay(time);
    }
    for (var x = 255; x > 0; x -= step) {
      if (x < 0) x = 0;
      var offset = [x + step * offsetsb[0], x + step * offsetsb[1]].map(o => (o > 255 ? 255 : o));
      Device.SetColor(Lights.Left, offset[1], 0, 0);
      Device.SetColor(Lights.WallLeft, offset[0], 0, 0);
      Device.SetColor(Lights.WallCenter, x, 0, 0);
      Device.SetColor(Lights.WallRight, offset[0], 0, 0);
      Device.SetColor(Lights.Right, offset[1], 0, 0);
      await delay(time);
    }
  };

  Device.on('close', () => {
    console.log('amBX disconnected!');
    EndFlag = true;
  });
  while (!EndFlag) await loop();
})();

const delay = time => {
  return new Promise(res => setTimeout(res, time));
};
