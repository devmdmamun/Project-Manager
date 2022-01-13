import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";

export const useCollection = (collection) => {
  const [document, setDcoument] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ref = projectFirestore.collection(collection);

    const unsub = ref.onSnapshot(
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });
        //update state
        setDcoument(results);
        setError(null);
      },
      (error) => {
        console.log(error);
        setError("could not fetch data");
      }
    );

    // unsub on unmount
    return () => unsub();
  }, [collection]);
  return { document, error };
};
