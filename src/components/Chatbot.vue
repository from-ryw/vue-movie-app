<script setup>
import { useChatbotStore } from '@/stores/chatbotStore.js';
import { useMovieStore } from '@/stores/movieStore';
import { nextTick, ref, watch } from 'vue';
 
const chatbotStore = useChatbotStore();
const movieStore = useMovieStore();
const chatList = ref(null);
const inputRef = ref(null);
const chatbotRef = ref(null);

// 채팅창 열리면 포커스
watch(() => chatbotStore.isChatOn, (val) => {
  if (val) {
    setTimeout(() => {
      inputRef.value?.focus();
    }, 300); // 애니메이션 시간만큼 delay(transition-duration: .3s)
    
    window.addEventListener('click', handleOutsideClick);
  } else {
    window.removeEventListener('click', handleOutsideClick);
  }
})


watch(() => chatbotStore.messages.length, async () => {
  // 메시지 바뀌면 스크롤 맨 밑으로
  await nextTick(); // DOM이 갱신되고 나서
  chatList.value?.scrollTo({
    top: chatList.value.scrollHeight,
    behavior: 'smooth'
  });
  inputRef.value?.focus();

  // 영화 타이틀 클릭하면 검색되게 만들기
  document.querySelectorAll('.movie-title').forEach(el => {
    el.addEventListener('click', () => {
      const title = el.dataset.movieTitle;
      movieStore.searchText = title;
      movieStore.searchMovies(1);
    })
  })
})

// 챗봇 영역이 아닌 곳을 선택하면 팝업 닫기
function handleOutsideClick(event) {
  if (!chatbotRef.value?.contains(event.target)) {
    chatbotStore.isChatOn = false;
  }
}

// 메시지 안에서 {{한글제목//영어제목}} 형식의 문자열을 찾아서 span태그로 감싸주기
function formatMessage(content) {
  if (typeof content !== 'string') return ''

  return content.replace(/{{(.*?)\/\/(.*?)}}/g, (match, ko, en) => {
    return `<span class="movie-title" data-movie-title="${en}">${ko}</span>`
  })
}
</script>


<template>
  <div ref="chatbotRef" class="chatbot" :class="{ 'chatbot--on': chatbotStore.isChatOn }">
    <div class="chats">
      <ul ref="chatList">
        <li v-for="(message, index) in chatbotStore.messages" :key="index" :class="message.role">
          <template v-if="message.role === 'assistant'">
            <div class="photo">
              <span class="material-symbols-outlined">smart_toy</span>
            </div>
          </template>
          <span v-html="formatMessage(message.content)"></span>
        </li>
        <li v-if="chatbotStore.isLoading" class="assistant">
          <div class="photo">
            <span class="material-symbols-outlined">smart_toy</span>
          </div>
          <div class="the-loader"></div>
        </li>
      </ul>
      <div class="input">
        <input ref="inputRef" v-model="chatbotStore.chatText" @keydown.enter="chatbotStore.sendMessages"/>
        <button class="btn btn-primary" @click="chatbotStore.sendMessages">
          <span class="material-symbols-outlined">send</span>
        </button>
      </div>
    </div>
    <div class="btn btn-circle chat-starter" @click="chatbotStore.toggleChatStarter">
      <span class="material-symbols-outlined icon--open">chat</span>
      <span class="material-symbols-outlined icon--close">close</span>
    </div>
  </div>
</template>


<style scoped>
</style>