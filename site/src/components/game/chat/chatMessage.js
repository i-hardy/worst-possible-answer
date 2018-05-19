import ChatPlayerMessage from '@/components/game/chat/chatPlayerMessage';
import ChatInfoMessage from '@/components/game/chat/chatInfoMessage';

export default {
  functional: true,
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  render(createElement, context) {
    const pickMessageComponent = () => {
      const { message } = context.props;
      if (message.player) {
        return ChatPlayerMessage;
      }
      return ChatInfoMessage;
    };
    return createElement(
      pickMessageComponent(),
      context,
    );
  },
};
