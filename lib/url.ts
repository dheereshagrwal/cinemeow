import qs from "query-string";

interface AddSearchPrams {
  prams: string;
  key: string;
  value: string;
}
interface DeleteSearchPrams {
  prams: string;
  Removekeys: string[];
}

export function AddSearchPrams({ prams, key, value }: AddSearchPrams) {
  const query = qs.parse(prams);
  query[key] = value;
  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: query,
    },
    { skipEmptyString: true, skipNull: true }
  );
}

export function DeleteSearchPrams({ prams, Removekeys }: DeleteSearchPrams) {
  const query = qs.parse(prams);
  Removekeys.forEach((key) => {
    delete query[key];
  });
  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: query,
    },
    { skipEmptyString: true, skipNull: true }
  );
}
