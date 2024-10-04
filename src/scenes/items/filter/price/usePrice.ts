import { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";
export const usePrice = () => {
  const [search, setSearch] = useSearchParams();
  const [min, setMin] = useState<number>(
    search.getAll("price").length > 0 ? Number(search.getAll("price")[0]) : 0
  );
  const [max, setMax] = useState<number>(
    search.getAll("price").length > 0
      ? Number(search.getAll("price")[1])
      : 10000
  );
  const { gender, type, undertype } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    left(
      search.getAll("price").length > 0 ? Number(search.getAll("price")[0]) : 0
    );

    right(
      search.getAll("price").length > 0
        ? Number(search.getAll("price")[1])
        : 10000
    );
  }, [location.search]);

  const percent = (val: number) => {
    const res = Math.round(((val - 0) / (10000 - 0)) * 100);
    return res;
  };

  const left = (value: number) => {
    if (value <= max) {
      setMin(value);
    }
  };
  const right = (value: number) => {
    if (min <= value) {
      setMax(value);
    }
  };

  const clear = () => {
    setMin(0);
    setMax(10000);
    navigate(`/${gender}/${type}/${undertype}`);
  };
  return { clear, left, right, percent, min, max };
};
