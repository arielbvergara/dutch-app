'use client';

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
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>
            <h2>Add Language and Word</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="language">Language:</label>
                <input
                    type="text"
                    id="language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    required
                />
                <br />
                <br />
                <label htmlFor="word">Word:</label>
                <input
                    type="text"
                    id="word"
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                    required
                />
                <br />
                <br />
                <input type="submit" value="Submit" />
            </form>
            <br />
            <table>
                <thead>
                    <tr>
                        <th>Language</th>
                        <th>Word</th>
                    </tr>
                </thead>
                <tbody>
                    {wordList.map((item, index) => (
                        <tr key={index}>
                            <td>{item.language}</td>
                            <td>{item.word}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </main>
    );
}
