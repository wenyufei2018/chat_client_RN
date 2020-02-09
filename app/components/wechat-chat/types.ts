import {IMessage, IUser} from '../../chat';

export {IMessage, IUser};

export type renderFunction = (x: any) => JSX.Element;

export type MessagePosition = 'left' | 'right';

export type ILoyoutItem =
  | 'noShow'
  | 'emojiShow'
  | 'functionShow'
  | 'voiceShow'
  | 'keyBoardShow';

export interface ILoyoutItemContext {
  loyout: ILoyoutItem;
  setLoyout: (loyoutItem: ILoyoutItem) => void;
  isFixed: boolean;
  setFixed: (isFixed: boolean) => void;
  loyoutFixed: {
    InputToolBar: {
      y: number;
      height: number;
    };
    keyBoardHeight: number;
  };
  inputToolBarY: number;
  setInputToolBarY: (inputToolBarY: number) => void;
}

// messages 全局

export type IVoiceState =
  | 'loading'
  | 'recording'
  | 'timeShort'
  | 'cancel'
  | 'giveUp';

export interface IMessagesContext {
  messages: IMessage[];
  user: IUser;
  friend: IUser;
  onSend: (message: IMessage) => void;
  messageContent: string;
  setMessageContent: (messageContent: string) => void;
  voiceState: IVoiceState;
  setVoiceState: (record: IVoiceState) => void;
}
