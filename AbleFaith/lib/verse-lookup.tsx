// verse lookup
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, doc, getDoc} from "firebase/firestore";
import { db } from "../app/(tabs)/_layout";

export type BibleVerse = {
  text: string;
  reference: string;
}

export async function getVerse(): Promise<BibleVerse | null> {
  try {
    const today = new Date().toISOString().split("T")[0];

    const cached = await AsyncStorage.getItem("cachedVerse");
    
    if(cached) { 
      const parsed = JSON.parse(cached);

      if (parsed.date === today) {
        return parsed.verse;
      }
    }

    const ref = doc(db, "config", "appData");
    const snap = await getDoc(ref);

    const verses: string[] = snap.data()?.verses || [];

    if(!verses.length) { return null; }

    const randomRef = verses[Math.floor(Math.random() * verses.length)];

    const res = await fetch(`https://bible-api.com/${encodeURIComponent(randomRef)}`);
    const data = await res.json();

    const verse: BibleVerse = {
      text: data.text.trim(),
      reference: data.reference,
    }

    await AsyncStorage.setItem(
      "cachedVerse", 
      JSON.stringify({
        date: today,
        verse,
      })
    );

    return verse;
  }
  catch(err) {
    console.error("Verse lookup failed", err);
    return null;
  }
}