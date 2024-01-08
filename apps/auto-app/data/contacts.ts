export interface Contact {
  id: number
  fullName: string
  currency: string
  amount: number | string
  latestTransactionDate: string | number | Date
}

export const contacts: Contact[] = [
  {
    id: 1,
    fullName: "John Doe",
    currency: "BTC",
    amount: 0.3546,
    latestTransactionDate: "2023-01-15",
  },
  {
    id: 2,
    fullName: "Alice Smith",
    currency: "ETH",
    amount: 123.45,
    latestTransactionDate: 1679788800000, // UNIX timestamp in milliseconds
  },
  {
    id: 3,
    fullName: "Bob Johnson",
    currency: "XRP",
    amount: "7500.20",
    latestTransactionDate: new Date("2022-09-30"),
  },
  {
    id: 4,
    fullName: "Eve Anderson",
    currency: "LTC",
    amount: 789.65,
    latestTransactionDate: "2022-12-05",
  },
  {
    id: 5,
    fullName: "Charlie Brown",
    currency: "ADA",
    amount: "456.78",
    latestTransactionDate: 1672540800000, // UNIX timestamp in milliseconds
  },
  {
    id: 6,
    fullName: "Grace Smith",
    currency: "BTC",
    amount: 2.345,
    latestTransactionDate: "2023-02-28",
  },
  {
    id: 7,
    fullName: "David Lee",
    currency: "ETH",
    amount: 567.89,
    latestTransactionDate: "2022-11-10",
  },
  {
    id: 8,
    fullName: "Emma Wilson",
    currency: "XRP",
    amount: "12000.75",
    latestTransactionDate: new Date("2022-08-20"),
  },
  {
    id: 9,
    fullName: "Sophia Davis",
    currency: "LTC",
    amount: 234.56,
    latestTransactionDate: "2022-12-31",
  },
  {
    id: 10,
    fullName: "James Smith",
    currency: "ADA",
    amount: "789.12",
    latestTransactionDate: 1669651200000, // UNIX timestamp in milliseconds
  },
  {
    id: 11,
    fullName: "Olivia Brown",
    currency: "BTC",
    amount: 1.234,
    latestTransactionDate: "2023-03-15",
  },
  {
    id: 12,
    fullName: "William White",
    currency: "ETH",
    amount: 345.67,
    latestTransactionDate: "2022-10-25",
  },
  {
    id: 13,
    fullName: "Ava Johnson",
    currency: "XRP",
    amount: "9500.32",
    latestTransactionDate: new Date("2022-07-12"),
  },
  {
    id: 14,
    fullName: "Mia Miller",
    currency: "LTC",
    amount: 1234.56,
    latestTransactionDate: "2022-11-20",
  },
  {
    id: 15,
    fullName: "Liam Davis",
    currency: "ADA",
    amount: "123.45",
    latestTransactionDate: 1666780800000, // UNIX timestamp in milliseconds
  },
  {
    id: 16,
    fullName: "Noah Johnson",
    currency: "BTC",
    amount: 3.456,
    latestTransactionDate: "2023-04-02",
  },
  {
    id: 17,
    fullName: "Sophia Taylor",
    currency: "ETH",
    amount: 987.65,
    latestTransactionDate: "2022-10-18",
  },
  {
    id: 18,
    fullName: "Aiden Wilson",
    currency: "XRP",
    amount: "8500.99",
    latestTransactionDate: new Date("2022-06-05"),
  },
  {
    id: 19,
    fullName: "Isabella Lee",
    currency: "LTC",
    amount: 345.67,
    latestTransactionDate: "2022-11-15",
  },
  {
    id: 20,
    fullName: "Ethan Adams",
    currency: "ADA",
    amount: "987.65",
    latestTransactionDate: 1663811200000, // UNIX timestamp in milliseconds
  },
]
