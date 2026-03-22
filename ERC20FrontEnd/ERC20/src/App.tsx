import "./connection";
import "./App.css";
import { useEffect, useState } from "react";
import { useAppKitAccount } from "@reown/appkit/react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Admin from "./components/Admin";
import User from "./components/User";
import { useReadErc20 } from "./hooks/specific/useReadERC20";

function App() {
  const { address, isConnected } = useAppKitAccount();
  const { getOwner } = useReadErc20();
  const [ownerAddress, setOwnerAddress] = useState<string | null>(null);

  useEffect(() => {
    const loadOwner = async () => {
      const contractOwner = await getOwner();
      setOwnerAddress(contractOwner);
    };

    loadOwner();
  }, [getOwner]);

  const shouldShowAdmin =
    Boolean(isConnected && address && ownerAddress) &&
    address!.toLowerCase() === ownerAddress!.toLowerCase();

  return (
    <>
      {shouldShowAdmin ? <Admin /> : <User />}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
