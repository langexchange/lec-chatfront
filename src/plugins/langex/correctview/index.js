/**
 * @copyright 2022, the Converse.js contributors
 * @license Mozilla Public License (MPLv2)
 */
// import '../chatboxviews/index.js';
// import 'shared/chat/chat-content.js';
// import 'shared/chat/help-messages.js';
// import 'shared/chat/toolbar.js';
// import ChatView from './chat.js';
import { _converse, api, converse } from '@converse/headless/core';
import CorrectFormView from './correct-form.js'
import { __ } from 'i18n';
const { u } = converse.env;
import { html } from 'lit';
// import { clearHistory } from './utils.js';

// import './styles/index.scss';

// const { Strophe } = converse.env;
const Diff = require('diff');

export const diffText = (original, corrected) => {
  const diff = Diff.diffChars(original, corrected);
  let fragment = document.createDocumentFragment();

  diff.forEach((part) => {
    const color = part.added ? '#53c51a' : part.removed ? '#ff4d4f' : '';
    const background = part.added ? '#f6ffec' : part.removed ? '#fff2f0' : 'none';
    const decoration = part.removed ? 'line-through' : 'none';
    let span = document.createElement('span');
    span.style.color = color;
    span.style.background = background;
    span.style.textDecoration = decoration;
    span.appendChild(document.createTextNode(part.value));
    fragment.appendChild(span);
  });

  return fragment
}





converse.plugins.add('converse-correctview', {
  /* Plugin dependencies are other plugins which might be
   * overridden or relied upon, and therefore need to be loaded before
   * this plugin.
   *
   * If the setting "strict_plugin_dependencies" is set to true,
   * an error will be raised if the plugin is not found. By default it's
   * false, which means these plugins are only loaded opportunistically.
   *
   * NB: These plugins need to have already been loaded via require.js.
   */
  // dependencies: ['converse-chatboxviews', 'converse-chat', 'converse-disco', 'converse-modal'],

  initialize() {

    _converse.CorrectFormView = CorrectFormView;

    function onCorrectionButtonClicked(ev) {
      ev?.preventDefault?.();
      const msg_wrapper = u.ancestor(this, '.message');

      // Get message needed to correct
      const msg_text = msg_wrapper.querySelector('converse-chat-message-body')?.textContent;

      // Open correct form with text inside
      const crrform = msg_wrapper.querySelector('converse-crrform');
      const display_input = crrform.querySelector('.crr-display');
      const crr_input = crrform.querySelector('.crr-msg');

      crr_input.value = msg_text;
      display_input.innerHTML = "" // Remove previous display input
      display_input.appendChild(diffText(msg_text, msg_text));

      crr_input.addEventListener('input', (ev) => {
        display_input.replaceChildren(diffText(msg_text, ev.target.value));
      })

      crrform.style.display = 'inline-block';
    }

    function addCorrectionOptions(actionView, buttons) {
      if (actionView.model.get('sender') !== 'me') {
        buttons.push({
          'i18n_text': __('Correct'),
          'handler': ev => {
            console.log(ev);
            onCorrectionButtonClicked.apply(actionView, [ev]);
          },
          'button_class': 'chat-msg__action-correct',
          'icon_class': 'fas fa-trash-alt',
          'name': 'correct',
        });
      }
      return buttons;
    }

    function transformCrrMsg(richText, options) {
      if (!richText.is_corrected) return;

      const langex_crrmsg = document.createElement("langex-crrmsg")
      langex_crrmsg.innerHTML = richText.toString()
      richText.addTemplateResult(0, richText.length, html`${langex_crrmsg}`);
    }

    api.listen.on('getMessageActionButtons', addCorrectionOptions);
    api.listen.on('beforeMessageBodyTransformed', transformCrrMsg);
  }
});
