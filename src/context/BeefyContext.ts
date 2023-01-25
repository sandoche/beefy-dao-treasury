import { createContext } from 'react';

import type BeefyContextInterface from './BeefyContextInterface';

const BeefyContext = createContext<BeefyContextInterface>({
  coinInformationIndex: {},
});

export default BeefyContext;
