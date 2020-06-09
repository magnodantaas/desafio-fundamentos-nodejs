import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

interface Result {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Result {
    const transcations: Transaction[] = this.transactions;
    const balance = this.getBalance();
    const result: Result = {
      transactions: transcations,
      balance,
    };

    return result;
  }

  public getBalance(): Balance {
    const { transactions } = this;
    let incomes = 0;
    let outcomes = 0;
    let total = 0;
    transactions.map(transaction => {
      if (transaction.type === 'income') {
        incomes += transaction.value;
      } else {
        outcomes += transaction.value;
      }
    });
    total = incomes - outcomes;
    const balance: Balance = {
      income: incomes,
      outcome: outcomes,
      total,
    };

    return balance;
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });
    const balance = this.getBalance();
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
