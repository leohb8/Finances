const Modal = {
    open() {
        document.querySelector('.modal-overlay')
        .classList.add('active');
    },
    close() {
        document.querySelector('.modal-overlay')
        .classList.remove('active');
    }
};

// populando as transações
const transactions = [
    {
        id: 1,
        description: 'Luz',
        amount: -500_00,
        date: '23/01/2021'
    },
    {
        id: 2,
        description: 'Criação Web',
        amount: 5000_00,
        date: '23/01/2021'
    },
    {
        id: 3,
        description: 'Internet',
        amount: -200_00,
        date: '23/01/2021'
    },
    {
        id: 4,
        description: 'App',
        amount: 20000_00,
        date: '23/01/2021'
    },
    {
        id: 5,
        description: 'Aluguel',
        amount: -20000_00,
        date: '23/01/2021'
    },
];

const Transaction = {
    all: transactions,

    add(transaction) {
        Transaction.all.push(transaction);

        App.reload();
    },

    incomes() {
        let income = 0;
        // pegar tods as transações
        // para cada transação,
        Transaction.all.forEach(transaction => {
            // se ela for maior que zero
            if( transaction.amount > 0 ) {
                // somar a uma variavel
                income += transaction.amount;
            };
        });
        // e retornar essa variavel
        return income;
    },

    expenses() {
        // Somar todas as saídas
        let expense = 0;

        Transaction.all.forEach(transaction => {
            if( transaction.amount < 0 ) {
                expense += transaction.amount;
            };
        });

        return expense
    },

    total() {
        // Entradas + saídas
        // sinal de '+' pois ja temos o '-' guardado
        return Transaction.incomes() + Transaction.expenses();
    }
};

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr');
        tr.innerHTML = DOM.innerHTMLTransaction(transaction);

        DOM.transactionsContainer.appendChild(tr);
        
    },

    innerHTMLTransaction(transaction) {
        // ? = if
        // : = else
        const CSSClass = transaction.amount > 0 ? "income" : "expense";

        const amount = Utils.formatCurrency(transaction.amount);

        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CSSClass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img src="./assets/minus.svg" alt="Remover transação">
            </td>
        `;
        return html
    },

    updateBalance() { 
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.incomes());
        document
            .getElementById('expenseDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.expenses());
        document
            .getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.total());
    },

    clearTransactions() {
        DOM.transactionsContainer.innerHTML = "";
    }
};

const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : "";

        value = String(value).replace(/\D/g, "");

        value = Number(value) / 100;

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

        return signal + value;
    }
};

const App = {
    init() {
        Transaction.all.forEach(transaction => {
            DOM.addTransaction(transaction);
        });
        
        DOM.updateBalance();
    },
    reload() {
        DOM.clearTransactions();
        App.init();
    },
};

App.init();
        
Transaction.add({
    id: 39,
    description: 'Alo',
    amount: 200_00,
    date: '23/01/2021'
});