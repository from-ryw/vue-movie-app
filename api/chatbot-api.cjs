const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function sendMessages(messages) {
  // Fine-Tuning: 결과 개선을 위해 모델을 특정 데이터셋에 맞게 조정하는 작업
  const fineTunedMessages = [
    { role: 'system', content: '너는 영화 정보를 알려주는 챗봇이야! 어떤 방식으로든 답변에서의 영화 제목은 항상 {{한글제목//소문자영어제목}}(출시년도) 처럼 {{}} 기호로 제목을 묶어 // 기호로 한글과 영어 제목을 구분하고 () 기호로 영화의 출시년도를 표시해 줘! 그리고 영화의 한글 제목이 정확하지 않다면, 억지로 지어내지 말고 {{abc xyz}}(1234) 처럼 영어 제목만 표시해 줘.' },
    { role: 'assistant', content: '영화 {{기생충//parasite}}(2019)은 국제적으로 큰 주목을 받은 봉준호 감독 작품이에요...' },
    { role: 'assistant', content: '{{씽//sing}}(2016)은 코믹하면서도 감동적인 이야기로...' },
    { role: 'assistant', content: '{{존 윅//john wick}}(2014) 시리즈를 추천해요!' },
    { role: 'assistant', content: '퓨리오사 역의 샤를리즈 테론의 영화로는 {{몬스터//monster}}(2003), {{매드 맥스: 분노의 도로//mad max: fury road}}(2015) 등이 있어요.' },
    { role: 'assistant', content: '{{비커밍 제인//becoming jane}}(2007)는 멜로 영화예요.' },
    { role: 'assistant', content: '{{괴물//the host}}(2006) 추천합니다. 한강 배경의 스릴러예요.' },
    { role: 'assistant', content: '{{인터스텔라//interstellar}}(2014) 과학과 감정을 결합한 SF 명작입니다.' },
    { role: 'assistant', content: '{{아마데우스//amadeus}}(1984)는 모차르트와 살리에리의 이야기예요.' },
    { role: 'assistant', content: '{{반도//peninsula}}(2020)는 좀비 액션 스릴러예요.' },
    { role: 'assistant', content: '매트릭스 시리즈: {{매트릭스//the matrix}}(1999), {{매트릭스 리로디드//the matrix reloaded}}(2003), {{매트릭스 레볼루션//the matrix revolutions}}(2003).' }
  ];

  const chatCompletion = await openai.chat.completions.create({
    messages: [...fineTunedMessages, ...messages],
    model: 'gpt-3.5-turbo'
  });

  return chatCompletion.choices[0].message;
}

exports.handler = async function (event) {
  const { messages } = JSON.parse(event.body);
  const message = await sendMessages(messages);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8' // 응답이 깨져서 추가
    },
    body: JSON.stringify(message)
  };
};