import { html } from "lit";

export default  (o) => html`
    <label>${o.label}
        <a class="form-url" target="_blank" rel="noopener" href="${o.value}">${o.value}</a>
    </label>`;
