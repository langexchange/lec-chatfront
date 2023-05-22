import { _converse, api, converse } from "@converse/headless/core"


//  While it’s possible to add new methods to classes via the overrides feature, it’s better and more explicit to use composition with Object.assign.

// A better approach is to use the events and hooks emitted by Converse, and to add your code in event handlers. This is however not always possible, in which case the overrides are a powerful tool.

// Plugins often need their own additional configuration settings and you can add these settings with the _converse.api.settings.update method.

converse.plugins.add('converse-langex-audiobot', {
  dependencies: ['convese-chat', 'converse-chatboxes', 'converse-disco'],

  overrides: {
  },
  
  
 

  initialize() {
    // function createCorrectedStanza(context, data){
    //   if(data.message.get('is_corrected')){
    //     data.stanza.c('crr').root();
    //   }
    //   return data;
    // }
    
    // ```xml
        // <langexbot xmlns="langex:chatbot">  
        //   <pronunc_assess xmlns="langex:chatbot:pronunc_assess"> </pronunc_assess>
	      //   <onboard xmlns="langex:chatbot:onboard"> </onboard>
        // </langexbot>
    //   
    // ```
    function parseAudioBotMsg(stanza, attrs){
      const is_langexbot = stanza.querySelector('langexbot')? true: false;
      const is_pronunc_assess = stanza.querySelector('pronunc_assess')? true: false;
      const is_onboard = stanza.querySelector('onboard')? true: false;

      attrs = Object.assign(attrs, {is_langexbot, is_pronunc_assess, is_onboard})
      return attrs
    }

    //Decode Corrected Messages
    api.listen.on('parseMessage', parseAudioBotMsg );

    // api.listen.on('createMessageStanza', createCorrectedStanza);
  }
});