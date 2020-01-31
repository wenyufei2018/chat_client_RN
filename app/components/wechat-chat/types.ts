// 用户声明
type renderFunction = (x: any) => JSX.Element;
interface User {
  _id: number;
  name?: string;
  avatar?: string;
}

// 消息回复声明
interface Reply {
  title: string;
  value: string;
  messageId?: any;
}

interface QuickReplies {
  type: 'radio' | 'checkbox';
  values: Reply[];
  keepIt?: boolean;
}

type MessageType = 'text' | 'image' | 'video' | 'audio' | 'system' | 'quickReplies';
interface IMessage {
  _id: string;
  type: MessageType;
  content: string;
  createdAt: Date;
  user: User;
  sent?: boolean;
  received?: boolean;
  pending?: boolean;
}

type IChatMessage = IMessage;

type MessagePosition = 'left' | 'right';

// 布局声明

// 这种方式粒度不够
// type ILoyoutItem = 'Messages_InputBar' | 'Messages_InputBar_Accessory' | 'Messages_InputBar_KeyBoard';

type ILoyoutItem = 'noShow' | 'emojiShow' | 'functionShow' | 'voiceShow' | 'keyBoardShow';

interface ILoyoutItemContext {
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

type IVoiceState = 'loading' | 'recording' | 'timeShort' | 'cancel' | 'giveUp';

interface IMessagesContext {
  messages: IMessage[];
  user: User;
  onSend: (message: IMessage) => void;
  messageContent: string;
  setMessageContent: (messageContent: string) => void;
  voiceState: IVoiceState;
  setVoiceState: (record: IVoiceState) => void;
}
