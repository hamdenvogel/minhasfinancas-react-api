import React from 'react';
import currencyFormatter from 'currency-formatter';

export default props => {

    const rows = props.lancamentos.map(lancamento => {
        return (
            <tr key={lancamento.id}>
                <td>{lancamento.descricao}</td>    
                <td>{currencyFormatter.format(lancamento.valor, {locale: 'pt-BR'})}</td>  
                <td>{lancamento.tipo}</td>  
                <td>{lancamento.mes}</td>
                <td>{lancamento.status}</td>  
                <td>
                  <button className="btn btn-success mr-1" title="Efetivar"
                          disabled={lancamento.status !== 'PENDENTE'}
                          onClick={e => props.alterarStatus(lancamento, 'EFETIVADO')}
                          type="button">
                          <i className="pi pi-check" style={{'fontSize': '0.8em'}}></i>
                  </button>
                  <button className="btn btn-warning mr-1" title="Cancelar"
                          disabled={lancamento.status !== 'PENDENTE'}
                          onClick={e => props.alterarStatus(lancamento, 'CANCELADO')}
                          type="button">
                          <i className="pi pi-times" style={{'fontSize': '0.8em'}}></i>
                  </button>
                  
                  <button type="button"  title="Editar"
                  className="btn btn-primary mr-1"
                  onClick={e => props.editAction(lancamento.id)}>
                      <i className="pi pi-pencil" style={{'fontSize': '0.8em'}}></i>
                  </button>
                  <button type="button" title="Excluir"
                  className="btn btn-danger"
                  onClick={e=> props.deleteAction(lancamento)}>
                      <i className="pi pi-trash" style={{'fontSize': '0.8em'}}></i>
                  </button>
                </td> 
            </tr>

        )
    })

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Descrição</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Mês</th>
                    <th scope="col">Situação</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}