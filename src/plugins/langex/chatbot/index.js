import { _converse, api, converse } from '@converse/headless/core';
import { __ } from 'i18n';
const { u } = converse.env;
import { html } from 'lit';
import { transform } from 'lodash-es';
import RecordToolView from './recording_tool'



converse.plugins.add('langex-audio-toolkit', {
  initialize() {
    _converse.RecordToolView = RecordToolView;
    

    api.listen.on('getToolbarButtons', (toolbar_el, buttons) => {
      buttons.push(html`<langex-recording-tool class='recording-tool-container'></langex-recording-tool>`);
      return buttons;
    })   
    

    // TODO: Seperate to audio bot package

      // 1. Onboard
      // ```xml
      //   <onboard xmlns="langex:chatbot:onboard"> </onboard>
      // ```

      // 2. Pronunciation Assessment
      // ```xml
      //   <pronunc_assess xmlns="langex:chatbot:pronunc_assess"> </pronunc_assess>
      // ```
    function transformAudioBotMsg(richText, options) {
      if (!richText.is_langexbot) return;

      console.log("Audio bot message transformation")
      console.log(richText)

      const langex_chatbotmsg = document.createElement("langex-chatbotmsg");
      langex_chatbotmsg.innerHTML = richText.toString();
      richText.addTemplateResult(0, richText.length, html`${langex_chatbotmsg}`);
    }

    api.listen.on('beforeMessageBodyTransformed', transformAudioBotMsg);
  }
});
