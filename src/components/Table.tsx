/* eslint-disable react/prop-types */
import React from 'react';
import api from '../utils/api';
import formattingDate from '../utils/formattingDate';

interface ITable {
  data: any[]
}

const Table: React.FC<ITable> = ({ data }) => {
  const [userData, setUserData] = React.useState<any>([]);
  const [infoTable, setInfoTable] = React.useState<any>([{
    id: '',
    address: '',
    reestrFlatCount: '',
    createdAt: new Date(),
  }]);
  const [count, setCount] = React.useState<number>(5);
  const tableHandled = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    setCount(5);
    if (evt.target.value) {
      const company = data.find((d) => d.name === evt.target.value);
      const index = data.indexOf(company);
      api.getInfoUpdateUser({ company_id: company.id, page: index, perPage: data.length })
        .then((res) => setInfoTable(res.data))
        .catch((err) => console.error(err));
    } else {
      setInfoTable([{
        id: '',
        address: '',
        reestrFlatCount: '',
        createdAt: new Date(),
      }]);
    }
  };

  function addData(num: number) {
    setCount(count + num);
  }

  React.useEffect(() => {
    setUserData([{ id: 0, name: '' }, ...data]);
  }, [data]);

  return (
    <section className="table-info">
      <h2>Выберите компанию:</h2>
      <select className="table-select" onChange={tableHandled}>
        {userData.map((d: { id: string, name: string }) => (
          <option key={d.id}>{d.name}</option>))}
      </select>
      <table className="table">
        <tbody>
          <tr className="table__col table__coll_theme_yellow">
            <th className="table__cell">id</th>
            <th className="table__cell">Адрес</th>
            <th className="table__cell">Номер в реестре</th>
            <th className="table__cell">Дата создания</th>
          </tr>
          {infoTable.slice(0, count).map((info: {
            id: string,
            address: string,
            reestrFlatCount: number,
            createdAt: number,
          }) => (
            <tr key={info.id} className="table__col">
              <th className="table__cell">{info.id}</th>
              <th className="table__cell">{info.address}</th>
              <th className="table__cell">{info.reestrFlatCount}</th>
              <th className="table__cell">{formattingDate(info.createdAt.toString())}</th>
            </tr>
          ))}
          {((infoTable.length > 0) && (infoTable.length > count)) && (<button className="table__button-add" type="button" onClick={() => addData(8)}>Ещё</button>)}
          {(infoTable.length === 0) && <tr><th>Нет данных</th></tr>}
        </tbody>
      </table>
    </section>
  );
};

export default Table;
