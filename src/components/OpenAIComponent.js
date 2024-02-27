'use client'

import { useState } from 'react';

const OpenAIComponent = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  
  const fetchGeneratedText = async () => {
    try {
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt }),
      });
      
      const data = await response.json();
      if (response.status !== 200) {
        setGeneratedText(`Status error when fetching generated text: ${response.status}`);
      }
      
      if(data?.message?.choices[0]?.message?.content !== null){
        setGeneratedText(data.message.choices[0].message.content.trim());
        setPrompt('');
      }
    } catch (error) {
      setGeneratedText('Error fetching generated text:', error);
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
      <button onClick={fetchGeneratedText}>Generate Text</button>
      </div>
      <div className="response">
        <h3>Generated Text:</h3>
        <p>{ generatedText }</p>
      </div>
    </div>
  );
};

export default OpenAIComponent;