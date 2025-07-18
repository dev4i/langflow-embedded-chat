import r2wc from "@r2wc/react-to-web-component";
import ChatWidget from "./chatWidget";

customElements.define(
  "langflow-chat",
  r2wc(ChatWidget, {
    shadow: "closed",
    props: {
      start_open: "boolean",
      api_key: "string",
      output_type: "string",
      input_type: "string",
      output_component: "string",
      chat_trigger_style: "json",
      host_url: "string",
      flow_id: "string",
      online: "boolean",
      online_message: "string",
      window_title: "string",
      tweaks: "json",
      bot_message_style: "json",
      user_message_style: "json",
      chat_window_style: "json",
      height: "number",
      width: "number",
      session_id: "string",
      chat_output_key: "string",
      error_message_style: "json",
      send_button_style: "json",
      send_icon_style: "json",
      placeholder: "string",
      placeholder_sending: "string",
      input_style: "json",
      input_container_style: "json",
      chat_position: "string",
      additional_headers: "json",
      onProcessMessage: "function",
    },
  })
);
