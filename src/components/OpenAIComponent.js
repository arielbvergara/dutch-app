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
    <div className="container flex w-full justify-center justify-items-center p-5">
      <div className='flex w-5/6 flex-col justify-center justify-items-center text-center'>
        <h2 className='text-xl'>Present perfect</h2>
        <div className="prompt">
          <div>
            <label className="input input-bordered flex items-center gap-2">
                <input type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="input-contrast-0 w-full grow border-none focus:border-none focus:ring-0" 
                placeholder="Search" />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
              </label>
          </div>
          <button className='btn btn-accent' onClick={fetchData}>Generate Text</button>
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
    </div>

  );
};

export default OpenAIComponent;