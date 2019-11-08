import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import './style.css';

export default function Search({ history }) {

  const [result, setResult] = useState([]);
  const [sub, setSub] = useState([]);

  useEffect(() => {
    async function loadResult() {

        const cpf = localStorage.getItem('cpf');
        const response = await api.get(`/result/${cpf}`);
        setResult(response.data.data);
        if (response.data.data) {
          setSub(response.data.data.subscriptionDto);
        }    
    }

    loadResult();
}, [result]);

    function handleCancel() {
        history.push("/");
    }

    return (
        <>
            { !result &&   <p>Proposta não encontrada com esse CPF.</p> }
           
            { result &&   
              <> 
                <label>Nome</label>
                <p>{sub.name}</p>
                <label>Idade</label>
                <p>{sub.age}</p>
                <label>Sexo</label>
                <p>{sub.gender}</p>
                <label>Estado Civil</label>
                <p>{sub.civilStatus}</p>
                <label>Dependentes</label>
                <p>{sub.dependents}</p>
                <label>Renda</label>
                <p>R$ {sub.income}</p>
                <label>Resultado Análise</label>
                <p>{result.approved ? 'Aprovado' : 'Rejeitado'}</p>
                <label>Limite</label>
                <p>{result.resultMessage}</p>
              </>
            }

           <button onClick={handleCancel} className="btn">Voltar</button>
            
        </>
    )
}