'use client'

import { useState } from 'react';

const OpenAIComponent = () => {
  const [prompt, setPrompt] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [generatedData, setGeneratedData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt }),
      });
      
      const data = await response.json();
      if (response.status !== 200) {
        setNotificationMessage(`Error fetching data: ${response.status}`);
      }
      
      if(data?.message?.choices[0]?.message?.content !== null){
        setGeneratedData(JSON.parse(data.message.choices[0].message.content.trim()));
        setPrompt('');
      }
    } catch (error) {
      setNotificationMessage('Error fetching data', error);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="example">
      <h2>Completion Example </h2>
      <div className="prompt">
        <div>
      <label  htmlFor="prompt">Prompt:</label>
      <input
        type="text"
        id="prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      </div>
      <button onClick={fetchData}>Generate Text</button>
      </div>
      <div className="response">
        <h3>Generated Text:</h3>
        <p>{ generatedData?.infinitive }</p>
        <p>{ generatedData?.present_perfect?.aux_verb }</p>
        <p>{ generatedData?.present_perfect?.verb }</p>
        <p>{ generatedData?.present_perfect?.example }</p>
      </div>
      {loading && <p>Loading...</p>}
      {notificationMessage && <p>Error: { notificationMessage }</p>}
    </div>
  );
};

export default OpenAIComponent;