// verse lookup
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, doc, getDoc} from "firebase/firestore";
import { db } from "../app/(tabs)/_layout";

export type BibleVerse = {
  text: string;
  reference: string;
}

const VERSE_CACHE = "cachedVerse";
const USED_VERSES = "usedVerses"

export async function getVerse(): Promise<BibleVerse | null> {
  try {
    const today = new Date().toISOString().split("T")[0];

    const cached = await AsyncStorage.getItem(VERSE_CACHE);
    
    if(cached) { 
      const parsed = JSON.parse(cached);

      if (parsed.date === today) {
        return parsed.verse;
      }
    }

    const snap = await getDoc(doc(db, "config", "appData"));
    const verses: string[] = snap.data()?.verses || [];
    if(!verses.length) { return null; }

    const used = await AsyncStorage.getItem(USED_VERSES);
    let usedVerses: string[] = used ? JSON.parse(used) : [];
    if(usedVerses.length >= verses.length) { usedVerses = []; }

    const unused = verses.filter(v => !usedVerses.includes(v));
    const randomRef = unused[Math.floor(Math.random() * unused.length)];

    const res = await fetch(`https://bible-api.com/${encodeURIComponent(randomRef)}`);
    const data = await res.json();

    const verse: BibleVerse = {
      text: data.text.trim(),
      reference: data.reference,
    }

    await AsyncStorage.multiSet([
      [
        VERSE_CACHE,
        JSON.stringify({
          date:today,
          verse,
        }),
      ],
      [
        USED_VERSES,
        JSON.stringify([
          ...usedVerses,
          randomRef,
        ]),
      ],
    ]);

    return verse;
  }
  catch(err) {
    console.error("Verse lookup failed", err);
    return null;
  }
}