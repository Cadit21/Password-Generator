import logo from './logo.svg';

import { useCallback, useEffect, useRef, useState } from 'react';

function App() {
  const [length, setLength] = useState(6);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState('');

  const passwordgen = useCallback(() => {
    let str = 'ABCDEFGHIabcdefghi';

    if (number) str += '1234567890';
    if (character) str += '#@$%^&*';

    let pass = '';

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, number, character]);

  useEffect(() => {
    passwordgen();
  }, [number, character, length, passwordgen]);

 const passwordref= useRef(null);

  const copyToClipboard = () => {
    passwordref.current?.select();
    navigator.clipboard.writeText(password).then(() => {
      alert('Password copied to clipboard!');
    });
  };

  return (
    <div className="App bg-black h-screen overflow-hidden">
      <div className="w-[40%] bg-slate-800 mx-auto px-4 mt-20 py-4 rounded-xl">
        <h1 className="text-center text-white text-2xl">Password Generator</h1>
        <div className="">
          <div className="flex pt-4">
            <input
              className="w-full py-2 px-2"
              placeholder="Password"
              value={password}
              readOnly
              ref={passwordref}
            />
            <button className="text-white border bg-green-700 px-2" onClick={copyToClipboard}>
              Copy
            </button>
          </div>
          <div className="flex pt-4 justify-evenly">
            <div className="flex">
              <input
                type="range"
                min={6}
                max={100}
                className="cursor-pointer"
                onChange={(e) => setLength(e.target.value)}
              />
              <p className="px-1 font-bold">Length: {length}</p>
            </div>

            <div className="flex">
              <input
                type="checkbox"
                onChange={(e) => setNumber((prev) => !prev)}
              />
              <p className="px-1 font-bold">Number</p>
            </div>
            <div className="flex">
              <input
                type="checkbox"
                onChange={(e) => setCharacter((prev) => !prev)}
              />
              <p className="px-1 font-bold">Character</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
