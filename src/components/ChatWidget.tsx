import Script from "next/script";

export default function ChatWidget() {
  return (
    <Script
      id="thelead101-chatbot-widget"
      src="https://api.thelead101.com/api/v1/public/chatbot-widget.js?code=59E0DFA66FB8"
      strategy="afterInteractive"
    />
  );
}
