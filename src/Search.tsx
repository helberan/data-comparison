import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import retelaClients from './retela.json';

const { read, utils } = XLSX;

interface ClientData {
  ic: string;
  name: string;
  fetchedName?: string;
}

export const Search = () => {
  const [companyData, setCompanyData] = useState<ClientData[]>(retelaClients);

  const fetchCompanyData = async (ic: string): Promise<string> => {
    try {
      const response = await fetch(`https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty/${ic}`);
      const data = await response.json();
      return data.obchodniJmeno;
    } catch (err) {
      console.error(err);
      return '';
    }
  };

  const handleExport = () => {
    console.log(companyData);
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(companyData);

    XLSX.utils.book_append_sheet(wb, ws, 'sheet1');

    XLSX.writeFile(wb, 'export.xlsx');
  };

  useEffect(() => {
    const fetchAllCompaniesData = async () => {
      const updatedCompanies = await Promise.all(
        companyData.map(async (company) => {
          const fetchedCompanyName = await fetchCompanyData(company.ic);
          return { ...company, fetchedName: fetchedCompanyName };
        })
      );
      setCompanyData(updatedCompanies);
    };
    fetchAllCompaniesData();
    console.log(companyData);
  }, [retelaClients]);

  return (
    <div className="App">
      <button onClick={handleExport}>Export</button>
      <table>
        <thead>
          <tr>
            <th>IČ</th>
            <th>Název společnosti (DTB ECOBAT)</th>
            <th>Název společnosti (ARES)</th>
            <th>Porovnání názvů</th>
          </tr>
        </thead>
        <tbody>
          {companyData.map((company) => (
            <tr key={company.ic}>
              <td>{company.ic}</td>
              <td>{company.name}</td>
              <td>{company.fetchedName ? company.fetchedName : 'NENALEZENO'}</td>
              <td>{company.fetchedName === company.name ? 'SHODA' : 'CHYBA'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
