import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  //Região
  const [regions, setRegions] = useState([]);
  const [regionSelected, setRegioSelected] = useState('');
  const handleChangeRegion = ({ target }) => { setRegioSelected(target.value) };


  //Região API
  useEffect(() => {
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/regioes`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setRegions(data)
      })
  }, [])

  //Estado

  const [states, setStates] = useState([]);
  const [statesSelected, setStatesSelected] = useState('');
  const handleChangeState = ({ target }) => { setStatesSelected(target.value) };

  //Estado API
  useEffect(() => {
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/regioes/${regionSelected}/estados`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setStates(data)

      })
  }, [regionSelected])







  //Município
  const [municipality, setMunicipality] = useState([]);
  const [municipalitySelected, setMunicipalitySelected] = useState('');
  const handleChangMunicipality = ({ target }) => { setMunicipalitySelected(target.value) };


  //Município API
  useEffect(() => {
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${statesSelected}/municipios
    `;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setMunicipality(data)
      })
  }, [regionSelected,statesSelected])






  return (
    <div className="container">
      <h2 className='title'>Preecha os dados</h2>
      {/*Região*/}
      <label htmlFor="regiao">Selecione sua Região:</label>
      <select name="regiao" id="regiao" onChange={handleChangeRegion} value={regionSelected}>
        <option value={null}>Selecione sua Região</option>
        {regions.map(el => (
          <option key={el.id} id={el.id} value={el.id}>{el.nome}</option>
        ))}
      </select>

      {/*Estado*/}

      {regionSelected &&
        <>
          <label htmlFor="estado">Selecione o Estado:</label>
          <select onChange={handleChangeState} value={statesSelected} name="estado" id="estado">
            <option value={null}>Selecione um Estado</option>
            {states.map(el => (
              <option key={el.id} value={el.sigla}>{el.nome}</option>
            ))}
          </select>
        </>
      }

      {/*Município*/}
      {statesSelected &&
        <>
          <label htmlFor="municipio">Selecione o Municípoio:</label>
          <select onChange={handleChangMunicipality} name="municipio" id="municipio">
            <option value={null}>Selecione um Município</option>
            {municipality.map(el => (
              <option key={el.id} value={el.nome}>{el.nome}</option>
            ))}
          </select>
        </>

      }
    </div>
  );
}

export default App;
