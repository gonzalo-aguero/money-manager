export default {
    "en": {
        appName: "Money Manager",
        welcome: "Welcome!",
        home: {
            title: "Home",
            totalAmount: "Total Amount",
            lastestExpenses: "Lastest Expenses",
            lastestIncomes: "Lastest Incomes",
            lastestTransfers: "Lastest Transfers",
        },
        tables: {
            name: "Name",
            reserve: "Reserve",
            account: "Account",
            description: "Description",
            amount: "Amount",
            date: "Date",
            to: "To",
            noRecords: {
                accounts: "No accounts created",
                expenses: "No expenses recorded",
                incomes: "No incomes recorded",
                transfers: "No transfers recorded",
                logs: "No logs found"
            }
        },
        accounts: {
            title: "Accounts",
            formTitle: "Create a new account",
            editFormTitle: "Edit account",
        },
        expenses: {
            title: "Expenses",
            totalExpenses: "Total expenses",
            formTitle: "Add a new expense",
        },
        incomes: {
            title: "Incomes",
            formTitle: "Add a new income",
        },
        transfers: {
            title: "Transfers",
            formTitle: "Add a new transfer",
            notEnoughReserve: {
                main: "The issuing account reserve is not sufficient.",
                theReserveOf: "The reserve of \"",
                is: "\" is $",
                end: "."
            }
        },
        logs: {
            title: "Movements",
            noLogs: "No logs found",
        },
        buttons: {
            addExpense: "Add expense",
            addIncome: "Add income",
            addTransfer: "Add transfer",
            createAccount: "Create account",
            editAccount: "Edit account",
            add: "Add",
            create: "Create",
            delete: "Delete",
            saveChanges: "Save changes",
            close: "Close",
            hideForm: "Hide form",
        },
        forms: {
            selectAccount: "Select the account to affect",
            selectIssuing: "Select the issuing account",
            selectReceiver: "Select the receiver account",
            amount: "Amount (Example: 17489.99)",
            greaterThan: "Amount must be greater than $",
            expenseSource: "Source (Example: Shopping, Friends, Food, etc)",
            incomeSource: "Source (Example: Job)",
            transferSource: "Source",
            note: "Note",
            source: "Source",
            accountName: "Account name",
            accountReserve: "Account reserve",
            accountDescription: "Account description",
        },
        logDetail: {
            affectedAccount: "Affected account(s)",
            amount: "Amount",
            date: "Date",
            source: "Source",
            note: "Note"
        },

    },



    "es": {
        appName: "Money Manager",
        welcome: "Bienvenido!",
        home: {
            title: "Inicio",
            totalAmount: "Dinero Total",
            lastestExpenses: "Últimos gastos",
            lastestIncomes: "Últimos Ingresos",
            lastestTransfers: "Últimas transferencias",
        },
        tables: {
            name: "Cuenta",
            reserve: "Dinero",
            account: "Cuenta",
            description: "Descripción",
            amount: "Monto",
            date: "Fecha",
            to: "Enviado a",
            noRecords: {
                accounts: "No se ha creado ninguna cuenta",
                expenses: "No hay gastos registrados",
                incomes: "No hay ingresos registrados",
                transfers: "No hay transferencias registradas",
                logs: "No hay movimientos registrados"
            }
        },
        accounts: {
            title: "Cuentas",
            formTitle: "Crear una nueva cuenta",
            editFormTitle: "Editar Cuenta",
        },
        expenses: {
            title: "Gastos",
            totalExpenses: "Gasto total",
            formTitle: "Agregar un nuevo gasto",
        },
        incomes: {
            title: "Ingresos",
            formTitle: "Agregar nuevo ingreso",
        },
        transfers: {
            title: "Transferencias",
            formTitle: "Agregar transferencia",
            notEnoughReserve: {
                main: "El dinero de la cuenta emisora no es suficiente.",
                theReserveOf: "La reserva de \"",
                is: "\" es $",
                end: "."
            }
        },
        logs: {
            title: "Movimientos",
            noLogs: "No se han registrado movimientos.",
        },
        buttons: {
            addExpense: "Agregar gasto",
            addIncome: "Agregar ingreso",
            addTransfer: "Agregar transferencia",
            createAccount: "Crear cuenta",
            editAccount: "Editar cuenta",
            create: "Crear",
            add: "Agregar",
            delete: "Eliminar",
            saveChanges: "Guardar cambios",
            close: "Cerrar",
            hideForm: "Ocultar Formulario",
        },
        forms: {
            selectAccount: "Seleccionar cuenta",
            selectIssuing: "Seleccionar cuenta que envía",
            selectReceiver: "Seleccionar cuenta que recibe",
            amount: "Monto (Ej: 17489.99)",
            greaterThan: "El monto debe ser mayor a $",
            expenseSource: "Origen (Ej: Shopping, Combustible, Comida, etc)",
            incomeSource: "Origen (Ej: Trabajo, Venta, etc)",
            transferSource: "Concepto",
            note: "Nota",
            source: "Origen/Concepto",
            accountName: "Nombre de la cuenta",
            accountReserve: "Reserva (Cant. de dinero)",
            accountDescription: "Descripción",
        },
        logDetail: {
            affectedAccount: "Cuenta afectada",
            amount: "Monto",
            date: "Fecha",
            source: "Origen / Concepto",
            note: "Nota"
        }
    }
}