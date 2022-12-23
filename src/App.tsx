import { useEffect, useState } from 'react';
import Form from './components/Form';
import Header from './components/Header';
import './index.css';
import { fetchOptions } from './requests/requests';
import { OptionsObject, StatesObject } from './ts/interfaces';

function App() {
  const [occupationOptions, setOccupationOptions] = useState<string[]>([]);
  const [stateOptions, setStateOptions] = useState<StatesObject[]>([]);

  useEffect(() => {
    getOptions();
  }, []);

  const getOptions = async (): Promise<void> => {
    try {
      const options: OptionsObject | undefined = await fetchOptions();
      setOccupationOptions((state) => [...options!.occupations]);
      setStateOptions((state) => [...[options!.states]]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <Form occupationOptions={occupationOptions} stateOptions={stateOptions} />
    </>
  );
}

export default App;
