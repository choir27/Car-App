export interface Search {
    searchValue: string;
    setSearchValue: (e: string) => void;
    setData: (e: any[]) => void;
    suggestions: React.JSX.Element | undefined;
    setSuggestions: (e: React.JSX.Element) => void;
    hidden: boolean;
    setHidden: (e: boolean) => void;
    database: string;
    collection: string;
    filterArray: string[];
  }
  
  export interface nav {
    pageHeading: string;
  }
  
  export interface buttons {
    cartLength: number;
    setCurrentPage: (e: number) => void;
    currentPage: number;
    rowsPerPage: number;
    className?: string;
  }

  export interface Profile {
    $id: string;
    email?: string;
    fileName: string;
    position: string;
    salary: string;
  }
  