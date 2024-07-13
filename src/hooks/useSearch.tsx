import { useCallback, useMemo, useState } from "react";

type SearchableFields<T> = {
  [K in keyof T]: T[K] extends string | number ? K : never;
}[keyof T];

export const useSearch = <T extends Record<string, any>>(
  data: T[] | undefined,
  fieldsToMatch: SearchableFields<T>[]
) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredData = useMemo(() => {
    if (!data) return [];
    if (!searchTerm) return data;

    const lowercasedSearchTerm = searchTerm.toLowerCase();

    const filtered = data.filter((item) =>
      fieldsToMatch.some((field) => {
        const value = item[field];
        if (typeof value === "string") {
          return value.toLowerCase().includes(lowercasedSearchTerm);
        }
        if (typeof value === "number") {
          return value.toString().includes(lowercasedSearchTerm);
        }
        return false;
      })
    );

    return filtered;
  }, [data, searchTerm, fieldsToMatch]);

  const onSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  return { filteredData, onSearch, searchTerm, setSearchTerm };
};
