export interface FiltersDate {
  title: string;
  value: string[];
  searchWindow?: boolean;
  tougle: string;
  setTougle: (tougle: string) => void;
  state: string[];
  setState: (state: string[]) => void;
}

export const useFilter = () => {
  const addDeleteValue = (
    e: React.ChangeEvent<HTMLInputElement>,
    state: string[],
    setState: (state: string[]) => void
  ) => {
    if (e.target.checked) {
      setState([
        ...state,
        e.target.value.toLocaleLowerCase().replaceAll(" ", "_"),
      ]);
    } else {
      setState(
        state.filter(
          (f) => f !== e.target.value.toLocaleLowerCase().replaceAll(" ", "_")
        )
      );
    }
  };

  return {
    addDeleteValue,
  };
};
