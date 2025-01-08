export default class Chat {
  private socket: WebSocket;
  private messagesContainer: HTMLDivElement;
  private messageInput: HTMLInputElement;
  private sendButton: HTMLButtonElement;
  private readonly userName: string;

  constructor() {
    this.userName = prompt("Введите ваше имя:") || 'Anonymous';
    this.socket = new WebSocket('ws://localhost:8080');
    this.messagesContainer = document.querySelector<HTMLDivElement>('#messages')!;
    this.messageInput = document.querySelector<HTMLInputElement>('#messageInput')!;
    this.sendButton = document.querySelector<HTMLButtonElement>('#sendButton')!;

    this.setupSocket(this.userName);
    this.setupEventListeners();
  }

  private setupSocket(userName: string) {
    this.socket.addEventListener('open', () => {
      this.socket.send(JSON.stringify({type: 'newUser', name: userName}));
    });

    this.socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'message') {
        this.addMessage(data.message, data.name);
      } else if (data.type === 'info') {
        this.addInfoMessage(data.message);
      } else if (data.type === 'userList') {
        this.updateUserList(data.users);
      }
    });
  }

  private setupEventListeners() {
    this.sendButton.addEventListener('click', () => this.sendMessage());
    this.messageInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        this.sendMessage();
      }
    });
  }

  private updateUserList(users: string[]) {
    const usersContainer = document.querySelector<HTMLDivElement>('#users')!;
    usersContainer.innerHTML = '';
    users.forEach((user) => {
      const userElement = document.createElement('div');
      const isSender = user === this.userName;
      userElement.classList.add('badge', isSender ? 'badge-accent' : 'badge-secondary', 'm-1');
      const userName = document.createElement('span');
      userName.textContent = user;
      userElement.appendChild(userName);
      usersContainer.appendChild(userElement);
    });
  }

  private sendMessage() {
    const message = this.messageInput.value;
    if (message) {
      this.socket.send(JSON.stringify({type: 'message', message}));
      this.messageInput.value = '';
    }
  }

  private addInfoMessage(message: string) {
    const messageElement = document.createElement('div');
    messageElement.className = 'flex justify-center';

    messageElement.innerHTML = `
      <span class="text-base-content/50">${message}</span>
    `;

    this.messagesContainer.appendChild(messageElement);
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }

  private addMessage(message: string, senderName: string) {
    const messageElement = document.createElement('div');
    const isSender = senderName === this.userName;
    const date = new Date();
    messageElement.className = isSender ? 'chat chat-sender' : 'chat chat-receiver';

    messageElement.innerHTML = `
    <div class="chat-header text-base-content">
      ${senderName}
      <time class="text-base-content/50">
        ${date.toLocaleTimeString(undefined, {hour: '2-digit', minute: '2-digit'})}
      </time>
    </div>
    <div class="chat-bubble">${message}</div>
  `;

    this.messagesContainer.appendChild(messageElement);
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }
}