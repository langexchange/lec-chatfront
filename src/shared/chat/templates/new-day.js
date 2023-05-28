import { html } from 'lit';

export default o => html`
    <div class="message date-separator my-3" data-isodate="${o.time}" style="max-width: 50%; margin: auto;">
        <hr class="separator" />
        <time class="separator-text" datetime="${o.time}"><span>${new Date(o.time).toLocaleDateString()}</span></time>
    </div>
`;
