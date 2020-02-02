import gql from 'graphql-tag';

export const addUser = gql`
  mutation{
      addUser(input:{name:"wenyufei1"}){
          name,
          avatar
      }
  }
`;

export const users = gql`
    query{
        users{
            name
            avatar
        }
    }
`;

type messageType = 'text'
  | 'image'
  | 'video'
  | 'audio'

export interface IAddMessage {
  type: messageType;
  content: string;
  userId: number;
}

export const addMessage = gql`
    mutation test($content: String!){
        addMessage(input: {type: text, content: $content, userId: 12}){
            type
            content
        }
    }
`;

export const messages = gql`
    query{
        messages{
            type
            content
        }
    }
`;
