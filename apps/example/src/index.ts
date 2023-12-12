// import { e2eSeedRecovery } from "./e2eSeedRecovery";
import { genAutoId } from "./genAutoId";
import { genAutoWallet } from "./genAutoWallet";
import { genEvmAddrs } from "./genEvmAddrs";
import { sss } from "./sss";

// e2eSeedRecovery().catch((err) => console.error("e2eSeedRecovery", err));

genAutoId();

genAutoWallet().catch((err) => console.error("genAutoWallet", err));
genEvmAddrs();
sss().catch((err) => console.error("genAutoWallet", err));
