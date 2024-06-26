import error from './assets/error.png';

export const ErrorMessage = () => {
  return (
    <div className="error">
      <img src={error} alt="error" />
      <div>
        <p>Soubor obsahuje příliš mnoho dat!</p>
        <p>Maximální počet řádků v souboru je 500!</p>
      </div>
    </div>
  );
};
