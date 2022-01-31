import { createContext, useState } from 'react';

const AppContext = createContext({});

const AppContextProvider = ({ children, tagList, categoriesList }) => {
  const [tags, setTags] = useState(tagList || []);
  const [transactions, setTransactions] = useState([]);
  const [totals, setTotals] = useState({ credit: '', debit: '', saved: ''  });
  const [categories, setCategories] = useState(categoriesList || new Map());

  return (
    <AppContext.Provider value={{
      tagList: [tags, setTags],
      transactionsList: [transactions, setTransactions],
      calculatedTotals: [totals, setTotals],
      categoriesList: [categories, setCategories]
    }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
