import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const transaction = this.transactionsRepository.create({
      type,
      value,
      title,
    });

    const balance = this.transactionsRepository.getBalance();
    if (transaction.value > balance.total) {
      throw Error('transaction amount is greater than the amount you own!');
    }
    return transaction;
  }
}

export default CreateTransactionService;
