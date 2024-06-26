import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { ErrorMessage } from './ErrorMessage';
import { SuccessMessage } from './SuccessMessage';

interface ClientData {
  IČ: string;
  Subjekt: string;
  nazevAres?: string;
  shoda?: boolean;
}

export const Search = () => {
  const [importedData, setImportedData] = useState<ClientData[]>();
  const [companyData, setCompanyData] = useState<ClientData[]>();
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (event: ProgressEvent<FileReader>) => {
        const workbook = XLSX.read(event.target?.result as string, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const sheetData: ClientData[] = XLSX.utils.sheet_to_json(sheet);

        const numberOfRows = sheet['!ref'] ? XLSX.utils.decode_range(sheet['!ref']).e.r + 1 : 0;
        console.log(`Number of rows: ${numberOfRows}`);

        if (numberOfRows < 500) {
          setImportedData(sheetData);
          setSuccessMessage(true);
        } else {
          setErrorMessage(true);
        }
      };

      reader.readAsBinaryString(file);
    }
    console.log(successMessage);
  };

  const handleFetch = async () => {
    if (importedData) {
      const updatedCompanies = await Promise.all(
        importedData.map(async (company) => {
          const fetchedCompanyName = await fetchCompanyData(company.IČ);
          return { ...company, nazevAres: fetchedCompanyName, shoda: fetchedCompanyName === company.Subjekt };
        })
      );
      setCompanyData(updatedCompanies);
    }
  };

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
    if (companyData) {
      let wb = XLSX.utils.book_new();
      let ws = XLSX.utils.json_to_sheet(companyData);

      XLSX.utils.book_append_sheet(wb, ws, 'sheet1');

      XLSX.writeFile(wb, 'export.xlsx');
    }
  };

  useEffect(() => {
    setErrorMessage(false);
    setSuccessMessage(false);
  }, [importedData]);

  return (
    <div className="App">
      <header>
        <div className="import-wrapper">
          <input type="file" onChange={handleImport} />
          {errorMessage && <ErrorMessage />}
          {successMessage && <SuccessMessage />}
          <button onClick={handleFetch} disabled={errorMessage ? true : false}>
            Porovnat
          </button>
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
          {companyData && (
            <tbody>
              {companyData.map((company) => {
                return (
                  <tr key={company.IČ}>
                    <td>{company.IČ}</td>
                    <td>{company.Subjekt}</td>
                    <td>{company.nazevAres ? company.nazevAres : 'NENALEZENO'}</td>
                    <td className={company.shoda ? 'green' : 'red'}>{company.shoda ? 'SHODA' : 'CHYBA'}</td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};
