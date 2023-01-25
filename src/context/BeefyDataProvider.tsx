import type CoinInformationIndex from '@/types/CoinInformationIndex';

import BeefyContext from './BeefyContext';
import type BeefyContextInterface from './BeefyContextInterface';

interface Props {
  children: JSX.Element;
  coinInformationIndex: CoinInformationIndex;
}

const BeefyDataProvider = ({ children, coinInformationIndex }: Props) => {
  const contextValue: BeefyContextInterface = {
    coinInformationIndex,
  };

  return (
    <BeefyContext.Provider value={contextValue}>
      {children}
    </BeefyContext.Provider>
  );
};

export default BeefyDataProvider;
