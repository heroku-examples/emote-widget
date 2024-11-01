import ReactDOM from 'react-dom/client';
import Widget from './emote/Widget';

class EmoteWidget extends HTMLElement {
  connectedCallback() {
    const root = ReactDOM.createRoot(this);
    const talkId = this.getAttribute('talk-id');
    const open = this.hasAttribute('open');
    root.render(<Widget talkId={talkId} open={open} />);
  }
}

customElements.define('emote-widget', EmoteWidget);
