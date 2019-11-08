import React, { useState } from 'react';
import api from '../../services/api';
import { useAlert } from 'react-alert'
import MaskedInput from 'react-text-mask'

export default function Dashboard({ history }) {
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');
    const [sexo, setSexo] = useState('');
    const [civil, setCivil] = useState('');
    const [estado, setEstado] = useState('');
    const [dependentes, setDependentes] = useState('');
    const [cpf, setCpf] = useState('');
    const [renda, setRenda] = useState('');
    const alert = useAlert();

    function handleSearch() {
      if (cpf) {
        localStorage.setItem('cpf', cpf);
        history.push('/search');
      }
    }

    async function handleSubmit(e) {
      e.preventDefault();
      
    const response = await api.post('/subscription', {
        name: nome,
        age: idade, 
        gender: sexo, 
        civilStatus: civil, 
        state: estado, 
        dependents: dependentes, 
        document: cpf, 
        income: renda
      });
  
      const { errors } = response.data;

      if ( !errors ) {
        alert.show("Cadastro realizado com sucesso, para verificar a aprovação pesquise por seu cpf.");
      } else {
        alert.show(errors);
      }

    }

    return (
        <>
            <p>Cadastre sua proposta de  <strong>crédito</strong></p>  
            <form onSubmit={handleSubmit}>
            
            <label htmlFor="cpf">CPF *</label>

            <MaskedInput
              mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/,/\d/]}
              name="cpf" id="cpf" 
              placeholder="999.999.999-86"
              required="required"
              value={cpf}
              onChange={event => setCpf(event.target.value)}
            />
            <button 
              className="btn btn-consulta" 
              type="button"
              onClick={handleSearch}
            >
                Consultar
            </button>
            <label htmlFor="nome">Nome *</label>
            <input 
                type="text" 
                name="nome" id="nome" 
                placeholder="Nome Sobrenome"
                required="required"
                value={nome}
                onChange={event => setNome(event.target.value)}
            />
            
            <label htmlFor="idade">Idade *</label>
            <input 
                type="number" 
                name="idade" id="idade" 
                value={idade}
                required="required"
                min="18"
                max="99"
                onChange={event => setIdade(event.target.value)}
            />

            <label htmlFor="sexo">Sexo *</label>
            <select 
                name="sexo" 
                id="sexo"
                required="required" 
                value={sexo}
                onChange={event => setSexo(event.target.value)}
            >
              <option value="">Selecione..</option>
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
            </select>

            <label htmlFor="civil">Estado civil *</label>
            <select 
                name="civil" 
                id="civil"
                required="required" 
                value={civil}
                onChange={event => setCivil(event.target.value)}
            >
              <option value="">Selecione..</option>
              <option value="Solteiro">Solteiro</option>
              <option value="Casado">Casado</option>
              <option value="Divorciado">Divorciado</option>
            </select>

            <label htmlFor="dependentes">Dependentes *</label>
            <input 
                type="number" 
                name="dependentes" id="dependentes" 
                value={dependentes}
                required="required"
                min="0"
                onChange={event => setDependentes(event.target.value)}
            />

            <label htmlFor="estado">Estado * (Disponível em apenas alguns)</label>
            <select 
                name="estado" 
                id="estado"
                required="required" 
                value={estado}
                onChange={event => setEstado(event.target.value)}
            >
              <option value="">Selecione..</option>
              <option value="SP">SP</option>
              <option value="RJ">RJ</option>
              <option value="MG">MG</option>
            </select>

            <label htmlFor="renda">Renda *</label>
            <MaskedInput
              mask={[/\d/, /\d/, /\d/, /\d/, '.', /\d/,/\d/]}
              name="renda" id="renda" 
              placeholder="R$ 1.000,00"
              required="required"
              value={renda}
              onChange={event => setRenda(event.target.value)}
            />

            <button className="btn" type="submit">Cadastrar</button>
            </form>
        </>
    )
}