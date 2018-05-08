import ChatPlayerMessage from '@/components/chat/chatPlayerMessage';
import ChatInfoMessage from '@/components/chat/chatInfoMessage';

export default {
  functional: true,
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  methods: {
    pickMessageComponent() {
      if (this.message.player) {
        return ChatPlayerMessage;
      }
      return ChatInfoMessage;
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
