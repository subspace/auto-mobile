import { types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

export const TransactionModel = types
  .model("Transaction")
  .props({
    fullName: types.maybe(types.string),
    sentAutoId: types.maybe(types.string),
    currency: types.maybe(types.string),
    rateExchange: types.maybe(types.number),
    transactionFees: types.maybe(types.number),
    amount: types.maybe(types.number),
  })
  .actions(withSetPropAction)
