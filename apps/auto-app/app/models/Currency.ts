import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

export const CurrencyModel = types
  .model("Currency")
  .props({
    id: types.number,
    amount: types.number,
    title: types.string,
    currencyLabel: types.string,
    rateDollarExchange: types.number,
  })
  .actions(withSetPropAction)
  .views((balance) => ({
    get amountInDollar() {
      const convertedAmount = balance.amount * balance.rateDollarExchange

      return convertedAmount
    },
  }))

export interface Currency extends Instance<typeof CurrencyModel> {}
export interface CurrencySnapshotOut extends SnapshotOut<typeof CurrencyModel> {}
export interface CurrencySnapshotIn extends SnapshotIn<typeof CurrencyModel> {}
