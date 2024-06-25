import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import retelaClients from './retela.json';

interface ClientData {
  ic: string;
  name: string;
  fetchedName?: string;
}

export const Search = () => {
  const [importedData, setImportedData] = useState<ClientData[]>();
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

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (event: ProgressEvent<FileReader>) => {
        const workbook = XLSX.read(event.target?.result as string, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const sheetData: ClientData[] = XLSX.utils.sheet_to_json(sheet);

        setImportedData(sheetData);
      };

      reader.readAsBinaryString(file);
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
      setImportedData(updatedCompanies);
      setCompanyData(updatedCompanies);
    };
    fetchAllCompaniesData();
    console.log(companyData);
  }, [retelaClients]);

  return (
    <div className="App">
      <header>
        <div className="import-wrapper">
          <input type="file" onChange={handleImport} />
          <button onClick={handleFetch}>Compare</button>
        </div>
        <button onClick={handleExport}>Export</button>
      </header>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>IČ</th>
              <th>Název společnosti (DTB ECOBAT)</th>
              <th>Název společnosti (ARES)</th>
              <th>Porovnání názvů</th>
            </tr>
          </thead>
          {importedData && (
            <tbody>
              {importedData.map((company) => (
                <tr key={company.ic}>
                  <td>{company.ic}</td>
                  <td>{company.name}</td>
                  <td>{company.fetchedName ? company.fetchedName : 'NENALEZENO'}</td>
                  <td>{company.fetchedName === company.name ? 'SHODA' : 'CHYBA'}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};
