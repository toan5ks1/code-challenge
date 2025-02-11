interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: string): number => {
    const priorityMap: Record<string, number> = {
      Osmosis: 100,
      Ethereum: 50,
      Arbitrum: 30,
      Zilliqa: 20,
      Neo: 20,
    };
    return priorityMap[blockchain] ?? -99;
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter(
        (balance) => getPriority(balance.blockchain) > -99 && balance.amount > 0
      )
      .sort(
        (lhs, rhs) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain)
      );
  }, [balances]);

  return (
    <div {...rest}>
      {sortedBalances.map((balance) => {
        const usdValue = (prices[balance.currency] ?? 0) * balance.amount;
        return (
          <WalletRow
            className={classes.row}
            key={balance.currency}
            amount={balance.amount}
            usdValue={usdValue}
            formattedAmount={balance.amount.toFixed()}
          />
        );
      })}
    </div>
  );
};
