'use client';

import OpenAIComponent from "@/components/OpenAIComponent";
import OpenAI from "openai";
import { useState } from "react";

export default function Home() {
  const [language, setLanguage] = useState('');
    const [word, setWord] = useState('');
    const [wordList, setWordList] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (language && word) {
            setWordList([...wordList, { language, word }]);
            setLanguage('');
            setWord('');
        }
    };


    return (
    
      <OpenAIComponent />
    );
}
