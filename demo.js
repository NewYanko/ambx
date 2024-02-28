import { CreateDevice, Lights } from './src/main.js';

async () => {
  var Device = await CreateDevice();
  var values = [0, 10, 20, 30, 40];
  const step = 10;

  const loop = () => {
    values = values.map(value => (value > 255 ? 0 : value + step));

    Device.SetColor(Lights.Left, values[0], 0, 0);
    Device.SetColor(Lights.WallLeft, values[1], 0, 0);
    Device.SetColor(Lights.WallCenter, values[2], 0, 0);
    Device.SetColor(Lights.WallRight, values[3], 0, 0);
    Device.SetColor(Lights.Right, values[4], 0, 0);
  };
  setInterval(loop, 50);
  loop();
};

(async () => {
  var Device = await CreateDevice();
  const step = 10;
  const time = 50;
  const offsets = [5, 10];
  const offsetsb = [4, 8];

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
  while (true) {
    await loop();
  }
})();

const delay = time => {
  return new Promise(res => setTimeout(res, time));
};
