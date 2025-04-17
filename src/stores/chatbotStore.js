import axios from 'axios';
import { defineStore } from 'pinia';

const defaultMessages = [
  { role: 'assistant', content: '좋아하는 영화 장르나 제목을 알려주세요.'}
];

export const useChatbotStore = defineStore('chatbot', {
  state: () => ({
    chatText: '',
    messages: defaultMessages,
    isLoading: false,
    isChatOn: false
  }),
  actions: {
    toggleChatStarter() {
      this.isChatOn = !this.isChatOn;
    },
    async sendMessages() {
      if (!this.chatText.trim()) return;
      if (this.isLoading) return;

      this.messages = [
        ...this.messages,
        { role: 'user', content: this.chatText }
      ];
      this.chatText = '';
      this.isLoading = true;
      
      try {

        const res = await axios.post('/api/chatbot-api', {
          messages: this.messages
        });
        const message = res.data;
        this.messages = [
          ...this.messages,
          message
        ];

      } catch (error) {
        console.log('sendMessages error:', error);
      } finally {
        this.isLoading = false;
      }
    },
    resetMessages() {
        this.messages = defaultMessages;
    }
  }
});