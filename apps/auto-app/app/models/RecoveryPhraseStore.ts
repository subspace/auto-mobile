import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const RecoveryPhraseStoreModel = types
  .model("RecoveryPhraseStore")
  .props({
    word1: "",
    word2: "",
    word3: "",
    word4: "",
    word5: "",
    word6: "",
    word7: "",
    word8: "",
    word9: "",
    word10: "",
    word11: "",
    word12: "",
  })
  .views((store) => ({
    get seedPhrase() {
      return Object.values(store).join(" ").trim()
    },
    get validationError() {
      if (
        !store.word1 ||
        !store.word2 ||
        !store.word3 ||
        !store.word4 ||
        !store.word5 ||
        !store.word6 ||
        !store.word7 ||
        !store.word8 ||
        !store.word9 ||
        !store.word10 ||
        !store.word11 ||
        !store.word12
      ) {
        return "All the words have to be filled"
      }
      return ""
    },
  }))
  .actions((store) => ({
    setWord1(value: string) {
      store.word1 = value
    },
    setWord2(value: string) {
      store.word2 = value
    },
    setWord3(value: string) {
      store.word3 = value
    },
    setWord4(value: string) {
      store.word4 = value
    },
    setWord5(value: string) {
      store.word5 = value
    },
    setWord6(value: string) {
      store.word6 = value
    },
    setWord7(value: string) {
      store.word7 = value
    },
    setWord8(value: string) {
      store.word8 = value
    },
    setWord9(value: string) {
      store.word9 = value
    },
    setWord10(value: string) {
      store.word10 = value
    },
    setWord11(value: string) {
      store.word11 = value
    },
    setWord12(value: string) {
      store.word12 = value
    },
  }))

export interface RecoveryPhraseStore extends Instance<typeof RecoveryPhraseStoreModel> {}
export interface RecoveryPhraseStoreSnapshot extends SnapshotOut<typeof RecoveryPhraseStoreModel> {}
