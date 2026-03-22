export const TOKEN_FAUCET_ABI = [
  // Constructor
  "constructor(string _name, string _symbol)",

  // View functions — token info
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address account) view returns (uint256)",
  "function allowance(address owner, address spender) view returns (uint256)",

  // View functions — faucet constants
  "function MAX_SUPPLY() view returns (uint256)",
  "function FAUCET_AMT() view returns (uint256)",
  "function CLAIM_INTERVAL() view returns (uint256)",

  // View functions — ownership
  "function owner() view returns (address)",

  // State-mutating functions — ERC-20
  "function transfer(address to, uint256 value) returns (bool)",
  "function approve(address spender, uint256 value) returns (bool)",
  "function transferFrom(address from, address to, uint256 value) returns (bool)",

  // State-mutating functions — faucet
  "function requestToken()",

  // State-mutating functions — owner only
  "function mint(uint256 _amount)",
  "function transferOwnership(address newOwner)",
  "function renounceOwnership()",

  // Events
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "event Approval(address indexed owner, address indexed spender, uint256 value)",
  "event Claimed(address indexed receiver, uint256 amount)",
  "event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)",

  // Errors
  "error ERC20InsufficientBalance(address sender, uint256 balance, uint256 needed)",
  "error ERC20InsufficientAllowance(address spender, uint256 allowance, uint256 needed)",
  "error ERC20InvalidSender(address sender)",
  "error ERC20InvalidReceiver(address receiver)",
  "error ERC20InvalidApprover(address approver)",
  "error ERC20InvalidSpender(address spender)",
  "error InsufficientBalance()",
  "error MustNotExceedMaxSupply(uint256 max)",
  "error NextClaimTimeNotReached()",
  "error OwnerCantClaim()",
  "error OwnableInvalidOwner(address owner)",
  "error OwnableUnauthorizedAccount(address account)",
] as const;