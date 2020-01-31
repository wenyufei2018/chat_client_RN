import moment from 'moment';
// @ts-ignore
import GraphemeSplitter from 'grapheme-splitter';

export function isSameDay(
  currentMessage: IMessage,
  diffMessage: IMessage | null | undefined,
) {
  if (!diffMessage || !diffMessage.createdAt) {
    return false;
  }

  const currentCreatedAt = moment(currentMessage.createdAt);
  const diffCreatedAt = moment(diffMessage.createdAt);

  if (!currentCreatedAt.isValid() || !diffCreatedAt.isValid()) {
    return false;
  }

  return currentCreatedAt.isSame(diffCreatedAt, 'day');
}

export function isSameUser(
  currentMessage: IMessage,
  diffMessage: IMessage | null | undefined,
) {
  return !!(
    diffMessage &&
    diffMessage.user &&
    currentMessage.user &&
    diffMessage.user._id === currentMessage.user._id
  );
}

const styleString = (color: string) => `color: ${color}; font-weight: bold`;

const headerLog = '%c[react-native-gifted-chat]';

export const warning = (...args: any) =>
  console.log(headerLog, styleString('orange'), ...args);

export const error = (...args: any) =>
  console.log(headerLog, styleString('red'), ...args);

export const isPlus = (loyout: ILoyoutItem): boolean => {
  if (loyout === 'emojiShow' || loyout === 'functionShow') {
    return true;
  } else {
    return false;
  }
};

export function deleteLastChar(str: string) {
  const splitter = new GraphemeSplitter();
  const graphemes = splitter.splitGraphemes(str); // 将含有表情的字符串分割成数组
  graphemes.pop(); // 删除数组中最后一个元素
  return graphemes.join(''); // 将数组还原成字符串
}
