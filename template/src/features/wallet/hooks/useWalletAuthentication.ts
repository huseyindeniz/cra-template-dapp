import useTypedSelector from '../../../hooks/useTypedSelector';
import { WalletStateType } from '../models/WalletGlobalState';
export const useWalletAuthentication = () => {
  const walletState = useTypedSelector(state => state.wallet.globalState.state);
  const isAuthenticated = walletState === WalletStateType.AUTHENTICATED;

  return { isAuthenticated };
};
