import 'flyonui/flyonui';

import './assets/styles/main.css';
import typescriptLogo from './assets/images/typescript.svg';
import flyonuiLogo from './assets/images/flyonui.svg';
import viteLogo from '/vite.svg'

import Chat from "./chat.ts";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <main class="main">
    <section class="logos-section">
      <a class="logos-wrapper__item logo" href="https://vite.dev" target="_blank">
        <img src="${viteLogo}" class="logo__image" alt="Vite logo" />
      </a>
        +
      <a class="logos-wrapper__item logo" href="https://www.typescriptlang.org/" target="_blank">
        <img src="${typescriptLogo}" class="logo__image" alt="TypeScript logo" />
      </a>
        +
      <a class="logos-wrapper__item" href="https://flyonui.com/" target="_blank">
        <img src="${flyonuiLogo}" class="logo__image" alt="FlyonUI logo" />
      </a>
    </section>
    <section class="chat-section">
      <h1 class="chat-section__title title">WebSocket Chat</h1>
      <div id="chat" class="chat-section__body">
        <div id="users" class="chat-section__users"></div>
        <div id="messages" class="chat-section__messages"></div>
        <div class="chat-section__action">
          <input class="input" type="text" id="messageInput" placeholder="Type a message..."/>
          <button id="sendButton" class="btn btn-primary">Send</button>
        </div>
      </div>
    </section>
    
  </main>
`

new Chat();

