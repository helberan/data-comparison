import error from './assets/error.png';

export const ColumnNamesErrorMessage = () => {
  return (
    <div className="error">
      <img src={error} alt="error" />
      <div>
        <p>Chyba: špatný název sloupců v tabulce!</p>
        <p>
          Název sloupců musí být <strong>"IČ"</strong> a <strong>"Subjekt"</strong>!
        </p>
      </div>
    </div>
  );
};
