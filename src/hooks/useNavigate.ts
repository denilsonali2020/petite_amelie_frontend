import { useLocation, useNavigate } from 'react-router-dom';

export const useNavigateWithSearchParam = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateWithSearchParam = (key: string, value: string) => {
    const searchParams = new URLSearchParams(location.search);

    searchParams.set(key, value);

    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  return navigateWithSearchParam;
};