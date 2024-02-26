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
      <form className="container mx-auto my-5">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Conjugations</h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label for="username" className="block text-sm font-medium leading-6 text-gray-900">Word</label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input type="text" name="username" id="username" autocomplete="username" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Word" />
                    <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Search</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
}
