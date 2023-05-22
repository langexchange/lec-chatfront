
// window.addEventListener('converse-loaded', () => {
  converse.plugins.add('converse-debug', {
      initialize () {
          const { _converse } = this;
          window._converse = _converse;
      }
  });

  converse.initialize({
      theme: "langexchange",
      auto_away: 300,
      enable_smacks: true,
      loglevel: 'debug',
      omemo_default: false,
      prune_messages_above: 100,
      message_archiving: 'always',
      keepalive: true,
      assets_path: '/chat/dist/',
      // muc_respect_autojoin: true,
      // muc_show_logs_before_join: true,
      // notify_all_room_messages: ['discuss@conference.conversejs.org'],
      view_mode: 'fullscreen',
      websocket_url: 'wss://langexchange.giize.com/chat/ws',
      whitelisted_plugins: ['converse-debug'],
      allow_non_roster_messaging: true,
      // credentials_url: "http://localhost:8081/myapp/auth/credentials?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODc4NzIxMTYsImlhdCI6MTY3Nzg2NzMxNywidWlkIjoiN2U2ZDg2MDEtMDFhNy00NDAzLTllZWUtZmFjNzYwMWFhZTIwIn0.JVZeVxlXJ__X1JcEeVMOTyfmrPp11OFC5-_C8PzOx4A",
      // auto_login: false,
      // jid: "hello@localhost",
      // password: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFiNjE2NTQ4LTA0NjAtNDAwOC1iYjI0LTlmZjdjZWY3YWQ5ZCIsInR5cCI6ImN1c3RvbWVyIiwiaW5jaWQiOiIzIiwibmJmIjoxNjc2ODY3MzE3LCJleHAiOjE2ODg0NzIxMTYsImlhdCI6MTY3Njg2NzMxNywidW5hbWUiOiJoZWxsbyJ9.vEJW4HupiW1ZrjXZU3Z-s_nyfgJCTWfJ2m8pi-iqBH0",
  });