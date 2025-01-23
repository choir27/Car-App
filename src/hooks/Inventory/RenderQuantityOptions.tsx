//render quantites of items in store
export function renderQuantityOptions(setItemQuantity: (e: number) => void) {
  const options = [];

  for (let i = 1; i <= 50; i++) {
    options.push(
      <option key={`option-${i}`} value={i}>
        {i}
      </option>,
    );
  }

  return (
    <select onChange={(e) => setItemQuantity(parseInt(e.target.value))}>
      {options}
    </select>
  );
}
