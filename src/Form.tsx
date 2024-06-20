import { useState } from 'react';
import { ARESSubject } from './interfaces';

export const Form = () => {
  const [subjectIco, setSubjectIco] = useState<string>('');
  const [subjectInfo, setSubjectInfo] = useState<ARESSubject>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async (ico: string) => {
    try {
      const response = await fetch(`https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty/${ico}`);
      const data: ARESSubject = await response.json();
      setSubjectInfo(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e: any) => {
    const newIco = e.target.value.replace(/\s/g, '');
    setSubjectIco(newIco);
  };

  const handleSearch = (e: any) => {
    e.preventDefault();
    setLoading(true);
    fetchData(subjectIco);
  };

  return (
    <div className="Form">
      <div>
        <form>
          <input type="text" placeholder="Hledat" onChange={handleChange} />
          <button onClick={handleSearch}>Vyhledat</button>
        </form>
        <div>
          <h2>Vyhledané ekonomické subjekty</h2>
          {loading ? (
            <p>Načítám data...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>IČO</th>
                  <th>Obchodní název</th>
                  <th>Právní forma</th>
                  <th>Sídlo</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{subjectInfo?.ico}</td>
                  <td>{subjectInfo?.obchodniJmeno}</td>
                  <td>{subjectInfo?.pravniForma}</td>
                  <td>{subjectInfo?.sidlo.textovaAdresa}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
