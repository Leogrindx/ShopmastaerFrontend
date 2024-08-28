import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
export interface FiltersDate {
  title: string;
  value: string[];
  searchWindow?: boolean;
  tougle: string;
  setTougle: (tougle: string) => void;
}
export const useFilter = () => {
  // Filter type [{color: ["red"]}]
  const { gender, type, undertype } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState<string[]>([]);
  const generateDataFilter = (e: any, filterType: string) => {
    if (e.target.checked) {
      const arr = [...state, e.target.value];
      setState(arr);
    } else {
      const data = state.filter((el) => el !== e.target.value);
      setState(data);
    }
  };

  const clearDataFilter = (filterType: string) => {
    setState([]);
    navigate(`/${gender}/${type}/${undertype}`);
  };

  return {
    generateDataFilter,
    state,
    setState,
    clearDataFilter,
  };
};
