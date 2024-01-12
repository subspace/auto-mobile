import { types } from "mobx-state-tree"
import { Currency, CurrencyModel } from "./Currency"
import { withSetPropAction } from "./helpers/withSetPropAction"

import { currencies } from "../../data/currencies"

export const BalanceStore = types
  .model("BalanceStore")
  .props({
    currencies: types.array(CurrencyModel),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    async fetchCurerncies() {
      return new Promise<Currency[]>((resolve) => {
        setTimeout(() => {
          resolve(currencies as Currency[])
          store.setProp("currencies", currencies as Currency[])
        }, 500)
      })
    },
  }))
