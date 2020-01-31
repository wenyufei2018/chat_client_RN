// @ts-ignore
import emojis from 'emojis-list';
export const emojisShow: string[][] = [];

function emojisShowInit() {
  for (let i = 0; i < 14; i++) {
    const tmp = [];
    for (let j = 0; j < 8; j++) {
      tmp.push(emojis[1753 + i * 8 + j]);
    }
    emojisShow.push(tmp);
  }
}

export default function Init() {
  emojisShowInit();
}
