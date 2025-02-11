## **Issues and How to Improve Them**

### **1\. Incorrect Variable Reference in `sortedBalances` Filtering**

- **Issue:**
- `if (lhsPriority > -99) {`

  The variable `lhsPriority` is not defined in the scope. This will cause a runtime error.

- **Fix:**\
  The correct variable should be `balancePriority`:

  `if (balancePriority > -99) {`

---

### **2\. Incorrect Filtering Logic**

- **Issue:**

```
return balances.filter((balance: WalletBalance) => {
    const balancePriority = getPriority(balance.blockchain);
    if (balancePriority > -99) {
       if (balance.amount <= 0) {
         return true;
       }
    }
    return false;
})
```

- This filtering logic returns **only balances with `amount <= 0`** when their priority is above `-99`, which seems incorrect.
- Likely, the intention was to **remove balances with amount `<= 0`**.

- **Fix:**

```
return balances.filter(
  (balance) => getPriority(balance.blockchain) > -99 && balance.amount > 0
);
```

---

### **3\. Inefficient `useMemo` Dependencies**

- **Issue:**

  `}, [balances, prices]);`

  - `prices` are included as a dependency in `useMemo`, **but they are not used** inside the memoization.
  - Including unnecessary dependencies can cause unnecessary re-renders.

- **Fix:**

  `}, [balances]);`

---

### **4\. Duplicate `.map()` Calls on `sortedBalances`**

- **Issue:**

```
const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
  return {
    ...balance,
    formatted: balance.amount.toFixed()
  }
})
```

- This creates **an additional array (`formattedBalances`)**, but the formatted value is only used in `rows`.
- We can **format the data inside the same `.map()` call** that generates `rows`, avoiding an unnecessary array creation.

- **Fix:**\
  Move the formatting logic inside the `rows` mapping.

---

### **5\. Incorrect Type in `rows.map()`**

- **Issue:**

  `const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {`

  - `sortedBalances` contains `WalletBalance` objects, **not `FormattedWalletBalance`**.
  - This will cause **TypeScript type errors**.

- **Fix:**\
  Change the type of `balance` to `WalletBalance`, or apply the transformation inside the map.

---

### **6\. Using Array Index as Key in `.map()`**

- **Issue:**
  `key={index}`

  - Using the index as a key is an **anti-pattern in React** because it can lead to **incorrect re-rendering** when the array order changes.

- **Fix:**\
  Use a unique identifier, such as `balance.currency`:

  `key={balance.currency}`

---

### **7\. Inefficient Calculation of `usdValue` in `rows`**

- **Issue:**

  `const usdValue = prices[balance.currency] * balance.amount;`

  - If `prices[balance.currency]` is **undefined**, this can result in `NaN`.

- **Fix:**\
  Use optional chaining and a fallback:

  `const usdValue = (prices[balance.currency] ?? 0) * balance.amount;`

## **Refactored Code**

```tsx
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
```

## **Key Improvements**

✅ **Fixed incorrect variable reference (`lhsPriority` → `balancePriority`).**\
✅ **Simplified filtering logic to correctly exclude balances with `amount <= 0`.**\
✅ **Removed unnecessary `prices` dependency from `useMemo`.**\
✅ **Eliminated unnecessary `formattedBalances` array.**\
✅ **Used a `Record<string, number>` for blockchain priority lookup (better performance).**\
✅ **Ensured safe handling of `prices[balance.currency]` using `?? 0`.**\
✅ **Used `balance.currency` as a unique `key` instead of `index`.**
