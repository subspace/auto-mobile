import { IMSTArray, ISimpleType, Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    authToken: types.maybe(types.string),
    fullname: "",
    subspaceAddress: types.maybe(types.string),
    evmAddresses: types.array(types.string),
    autoId: types.maybe(types.string),
  })
  .actions(withSetPropAction)
  .views((store) => ({
    get isAuthenticated() {
      return !!store.autoId
    },
    get validationError() {
      if (store.fullname.length === 0) return "can't be blank"
      if (store.fullname.length < 6) return "must be at least 6 characters"
      return ""
    },
  }))
  .actions((store) => ({
    setAutoId(value: string | bigint) {
      if (typeof value === "bigint") {
        store.autoId = value.toString()
      } else {
        store.autoId = value
      }
    },
    setSubspaceAddress(value: string) {
      store.subspaceAddress = value
    },
    setEvmAddresses(value: string[]) {
      store.evmAddresses = value as IMSTArray<ISimpleType<string>>
    },
    setAuthToken(value?: string) {
      store.authToken = value
    },
    setFullname(value: string) {
      store.fullname = value
    },
    logout() {
      store.autoId = undefined
      store.fullname = ""
    },
  }))

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshot extends SnapshotOut<typeof AuthenticationStoreModel> {}
