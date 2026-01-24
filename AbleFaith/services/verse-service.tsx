// verse service
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, doc, getDoc} from "firebase/firestore";

const db = getFirestore();

export type BibleVerse = {
  text: string;
  reference: string;
}