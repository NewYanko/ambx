export const USB = {
  VID: 0x0471,
  PID: 0x083f,
  Endpoints: {
    IN: 0x81,
    OUT: 0x02,
    PNP: 0x83,
  },
};

export type Command = number;
export const Commands: Record<string, Command> = {
  Header: 0xa1,
  SetColor: 0x03,
};

export type Light = number;
export const Lights: Record<string, Light> = {
  Left: 0x0b,
  Right: 0x1b,
  WallLeft: 0x2b,
  WallCenter: 0x3b,
  WallRight: 0x4b,
  All: 0xff,
};
