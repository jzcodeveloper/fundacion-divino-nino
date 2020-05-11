import { useEffect, useState, useRef } from "react";

//Prevents useEffect upon initial render
export const useIsMounted = () => {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  return isMounted.current;
};

//Stores old state to compare to the new state
//Allows checks like prevState.prop === state.prop
export const usePrevious = (value) => {
  const prevState = useRef();

  useEffect(() => {
    prevState.current = value;
  }, [value]);

  return prevState.current;
};

//Uses setinterval
export const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };

    if (delay !== null) {
      const interval = setInterval(tick, delay);
      return () => clearInterval(interval);
    }
  }, [delay]);
};

export const useSortBy = (initialData) => {
  const [data, setData] = useState(initialData);
  const [sortBy, setSortBy] = useState({ key: "", descending: true });
  const [sorting, setSorting] = useState(true);
  const prevSorting = usePrevious(sorting);

  const { key, descending } = sortBy;

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  useEffect(() => {
    setSorting(false);
  }, [data]);

  useEffect(() => {
    setSorting(true);
  }, [sortBy]);

  useEffect(() => {
    if (!prevSorting && sorting) {
      const newData = data.map((d) => ({ ...d }));

      newData.sort((a, b) => {
        if (descending) {
          if (a[key] < b[key]) return 1;
          if (a[key] > b[key]) return -1;
          return 0;
        }

        if (a[key] > b[key]) return 1;
        if (a[key] < b[key]) return -1;
        return 0;
      });

      setData(newData);
    }
  }, [sorting]);

  return [data, sorting, key, descending, setSortBy];
};

export const useFilterBy = (initialData, filterBy) => {
  const [data, setData] = useState(initialData);
  const [filter, setFilter] = useState(filterBy);
  const [filtering, setFiltering] = useState(true);
  const prevFiltering = usePrevious(filtering);

  const keys = Object.keys(filter);
  const values = Object.values(filter).map((value) => value.toLowerCase());

  const prevFilter = usePrevious(values[0]);
  const shouldFilter = useRef(true);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  useEffect(() => {
    setFiltering(false);
  }, [data]);

  useEffect(() => {
    if (prevFilter === values[0]) shouldFilter.current = false;
    else shouldFilter.current = true;

    setFiltering(true);
  }, [filter]);

  useEffect(() => {
    if (!prevFiltering && filtering && shouldFilter.current) {
      const filteredData = initialData.filter(
        (d) => d[keys[0]].toLowerCase().indexOf(values[0]) > -1
      );

      setData(filteredData);
    } else {
      setFiltering(false);
    }
  }, [filtering]);

  return [data, filtering, filter, setFilter];
};
