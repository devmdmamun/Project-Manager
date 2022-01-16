import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";

export const useDocument = (collection, id) => {
  const [document, setDocument] = useState(null);
  const [error, seterror] = useState(null);

  useEffect(() => {
    const ref = projectFirestore(collection).doc(id);

    // realtime data for document
    const unsub = ref.onSnapshot(
      (snapshot) => {
        setDocument({ ...snapshot.data(), id: snapshot.id });
        seterror(null);
      },
      (err) => {
        console.log(err);
        seterror(err.message);
      }
    );

    return () => unsub();
  }, [collection, id]);

  return { document, error };
};
