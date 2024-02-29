'use client'

import { useState } from 'react';
import Verb, { Past } from './verb';
import Loading from './loading';
import WordTranslation from './wordTranslation';
import SentenceTranslation from './sentenceTranslation';

const OpenAIComponent = () => {
  const [prompt, setPrompt] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [generatedData, setGeneratedData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt }),
      });

      console.log(response);
      
      const data = await response.json();
      if (response.status !== 200) {
        setNotificationMessage(`Error fetching data: ${response.status}`);
      }
      
      if(data?.message?.choices[0]?.message?.content !== null){
        console.log(data.message.choices[0].message.content);
        setGeneratedData(JSON.parse(data.message.choices[0].message.content.trim()));
      }
    } catch (error) {
      setNotificationMessage('Error fetching data', error);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <form method='POST' onSubmit={fetchData} className="container flex w-full justify-center justify-items-center p-5">
      <div className='flex w-5/6 flex-col justify-center justify-items-center text-center'>
        <h2 className='my-5 text-xl'>Search</h2>
        <div className="prompt">
          <div>
            <label className="input input-bordered my-5 flex items-center gap-2">
                <input type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="input-contrast-0 w-full grow border-none focus:border-none focus:ring-0" 
                placeholder="Search" />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
              </label>
          </div>
        </div>
        {
          loading 
          ? 
            (
              <Loading />
            )
          : 
            (
              generatedData && generatedData.type == "verb" && <Verb generatedData={generatedData} />
              
              || 
              
              generatedData && generatedData.type == "word_translation" && <WordTranslation generatedData={generatedData} />
              
              || 
              
              generatedData && generatedData.type == "sentence_translation" && <SentenceTranslation generatedData={generatedData} />
              
            )
        }
        {notificationMessage && <p>Error: { notificationMessage }</p>}
      </div>
    </form>
  );
};

export default OpenAIComponent;