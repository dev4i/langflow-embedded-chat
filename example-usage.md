# Usage Example for onProcessMessage Prop

The `onProcessMessage` prop allows you to process incoming AI chat messages before they are displayed in the chat interface. This is particularly useful for extracting commands or formatting responses.

## Basic Usage

```javascript
import ChatWidget from "./src/chatWidget";

function App() {
  // Function to process incoming AI messages
  const processMessage = (message) => {
    // Extract commands that start with /
    if (message.includes("/")) {
      const commandPattern = /\/(\w+)(?:\s+(.*))?/g;
      let match;
      const commands = [];

      while ((match = commandPattern.exec(message)) !== null) {
        commands.push({
          command: match[1],
          args: match[2] || "",
        });
      }

      // Process commands (e.g., execute them, log them, etc.)
      commands.forEach(({ command, args }) => {
        console.log(`Executing command: ${command} with args: ${args}`);
        // Your command execution logic here
      });

      // Remove commands from the message or modify the display
      const cleanedMessage = message.replace(/\/\w+(?:\s+[^\n]*)?/g, "").trim();
      return cleanedMessage || "Command executed successfully!";
    }

    // Return the original message if no processing needed
    return message;
  };

  return (
    <ChatWidget
      host_url="https://your-langflow-host.com"
      flow_id="your-flow-id"
      onProcessMessage={processMessage}
      // ... other props
    />
  );
}
```

## Advanced Example - Command Extraction and Execution

````javascript
const processMessage = (message) => {
  // Look for JSON commands
  const jsonCommandPattern = /```json\s*(\{.*?\})\s*```/gs;
  const jsonMatch = jsonCommandPattern.exec(message);

  if (jsonMatch) {
    try {
      const command = JSON.parse(jsonMatch[1]);

      // Execute the command based on its type
      switch (command.type) {
        case "navigate":
          window.location.href = command.url;
          break;
        case "highlight":
          highlightElement(command.selector);
          break;
        case "alert":
          alert(command.message);
          break;
        default:
          console.log("Unknown command:", command);
      }

      // Return a user-friendly message
      return message.replace(
        jsonCommandPattern,
        `✅ Executed ${command.type} command`
      );
    } catch (error) {
      console.error("Failed to parse command:", error);
      return message;
    }
  }

  return message;
};
````

## Web Component Usage

If you're using the web component version:

```html
<script>
  document.addEventListener("DOMContentLoaded", function () {
    const chatWidget = document.querySelector("langflow-chat");

    chatWidget.onProcessMessage = function (message) {
      // Your processing logic here
      console.log("Processing message:", message);

      // Example: Extract and handle mentions
      const mentions = message.match(/@(\w+)/g);
      if (mentions) {
        mentions.forEach((mention) => {
          console.log("User mentioned:", mention);
          // Handle the mention (e.g., send notification)
        });
      }

      return message;
    };
  });
</script>

<langflow-chat host_url="https://your-langflow-host.com" flow_id="your-flow-id">
</langflow-chat>
```

## Use Cases

1. **Command Extraction**: Extract and execute commands embedded in AI responses
2. **Message Formatting**: Clean up or reformat AI responses before display
3. **Content Filtering**: Remove sensitive information or inappropriate content
4. **Analytics**: Log or track specific patterns in AI responses
5. **Dynamic Actions**: Trigger UI actions based on AI response content
6. **Integration**: Connect AI responses to other parts of your application

The function receives the raw AI message as a string and should return the processed message as a string that will be displayed in the chat interface.
