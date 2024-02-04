import axios, { AxiosError } from 'axios';
import { useState } from 'react';

const API_KEY = import.meta.env.VITE_API_KEY;
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { axiosInstanceGPT } from '../services/axiosInterceptor';
import './layoutGpt.css';
// import {
//   MainContainer,
//   ChatContainer,
//   MessageList,
//   Message,
//   MessageInput,
//   TypingIndicator,
// } from "@chatscope/chat-ui-kit-react";

interface Message {
  role: 'user' | 'assistant';
  status?: boolean;
  content: string;
}

const newMessage = (
  role: Message['role'],
  content: string,
  status: boolean = true
): Message => ({
  content,
  role,
  status,
});

const LayoutGpt = () => {
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [conversation, setConversation] = useState<Message[]>([]);

  const test =
    'Aquí tienes un ejemplo simple de un código HTML para crear una página web básica: ``` const patito = test.split("a");    // patito[1] contendrá el código HTML const codigoHTML = patito[1].trim();    console.log(codigoHTML); ``` Este código crea una página web con un encabezado que contiene un título y un menú de navegación, un contenido principal con dos secciones, y un pie de página con información de derechos de autor. Puedes guardar este código en un archivo HTML y abrirlo con un navegador para ver cómo se ve la página web resultante.';

  const test2 = test.replace('```', '<code>');
  const parsinCode2 = test.split('```');
  const parsinCode = test.split('```')[1].trim();
  const code = '<code>' + parsinCode + '</code>';

  console.log({ code, test2, parsinCode2 });

  const handleRequest = async () => {
    const parseCode = inputText.replace('```', '<code>');
    const userMessage = newMessage('user', parseCode);
    setConversation([...conversation, userMessage]);

    await axiosInstanceGPT
      .post('', {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: inputText },
        ],
      })
      .then(({ data }) => {
        const content: string = data.choices[0].message.content;

        const assistantMessage = newMessage('assistant', content);
        setOutputText(content);
        setConversation([...conversation, assistantMessage]);
      })
      .catch((err: AxiosError) => {
        const assistantMessage = newMessage('assistant', err.message, false);
        setConversation([...conversation, assistantMessage]);
      });
  };

  console.log(conversation);

  return (
    <div>
      <div
        style={{
          minHeight: '200px',
          border: '1px solid #ccc',
          padding: '10px',
          marginBottom: '10px',
          overflowY: 'auto',
        }}
      >
        {conversation.map((message, index) => (
          <div
            key={index}
            style={{
              marginBottom: '8px',
              color: message.role === 'assistant' ? 'green' : 'blue',
            }}
          >
            <strong>{message.role}:</strong> {message.content}
          </div>
        ))}
      </div>
      <div>
        <div
          className="layout-code"
          dangerouslySetInnerHTML={{ __html: code }}
        />
      </div>
      <label>
        Input
        <input
          type="text"
          placeholder="hoa"
          value={inputText}
          onChange={({ target }) => {
            setInputText(target.value);
          }}
        />
      </label>
      <button onClick={handleRequest}>Enviar</button>
      <div>
        <strong>Respuesta:</strong> {outputText}
      </div>
    </div>
  );
};

export default LayoutGpt;
