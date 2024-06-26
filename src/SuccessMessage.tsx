import success from './assets/success.png';

export const SuccessMessage = () => {
  return (
    <div className="success">
      <img src={success} alt="success" />
      <div>
        <p>Soubor byl úspěšně nahrán.</p>
        <p>
          Pro porovnání nahraných dat s ARES stiskněte tlačítko "<em>Porovnat</em>".
        </p>
      </div>
    </div>
  );
};
