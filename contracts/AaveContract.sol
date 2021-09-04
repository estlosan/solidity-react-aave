import "./interfaces/IUniswapV2Router01.sol";
import "@aave/protocol-v2/contracts/interfaces/ILendingPoolAddressesProvider.sol";
import "@aave/protocol-v2/contracts/interfaces/ILendingPool.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

pragma solidity ^0.6.12;

contract AaveTask {
    
    ILendingPoolAddressesProvider provider;
    ILendingPool lendingPool;
    IUniswapV2Router01 router;
    
    constructor() public {
        provider = ILendingPoolAddressesProvider(0x88757f2f99175387aB4C6a4b3067c77A695b0349);
        lendingPool = ILendingPool(provider.getLendingPool());
        router = IUniswapV2Router01(0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D);
    }
    
    function deposit(address asset, uint amount) external {
        IERC20 token = IERC20(asset);
        token.transferFrom(msg.sender, address(this), amount);
        token.approve(address(lendingPool),amount);
        lendingPool.deposit(asset, amount, address(this), 0);
    }
    
    function withdrawAndAddLiquidity(address withdAsset, address liqAsset, uint withdAmount, uint liqAmount ) external returns(uint) {
        uint amount = lendingPool.withdraw(withdAsset, withdAmount, address(this));
        
        address tokenA = withdAsset;
        address tokenB = liqAsset;
        IERC20(tokenB).transferFrom(msg.sender, address(this), liqAmount);
        
        IERC20(tokenA).approve(address(router), amount);
        IERC20(tokenB).approve(address(router), liqAmount);
        
        router.addLiquidity(
            tokenA,
            tokenB,
            amount,
            liqAmount,
            1,
            1,
            address(this),
            block.timestamp
        );
    }
}