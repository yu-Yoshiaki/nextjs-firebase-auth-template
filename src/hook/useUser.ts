import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";
import type {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";
import { setDoc } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { useCallback } from "react";
import { app } from "src/lib/firebase";
import useSWR from "swr";

const auth = getAuth(app);
const firestore = getFirestore(app);

type UserInfomation = {
  name: string;
  profile: string;
  image?: {
    src: string;
    alt: string;
  };
};

const userConverter: FirestoreDataConverter<UserInfomation> = {
  toFirestore(userInfomation: UserInfomation): DocumentData {
    // id は Firestore のパスで表現されるでドキュメントデータには含めない。
    // 下記の updatedAt のように、自動で更新時刻のフィールドを追加することも可能。
    return {
      updatedAt: serverTimestamp(),
      name: userInfomation.name,
      profile: userInfomation.profile,
    };
  },

  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): UserInfomation {
    const data = snapshot.data(options);

    return {
      name: data.name,
      profile: data.profile,
      image: {
        src: data.image.src,
        alt: data.image.alt,
      },
    };
  },
};

export const useUser = () => {
  const { data: user, mutate: setUser } = useSWR<User>("user", null, {
    fallbackData: undefined,
  });

  const { data: userInfomation, mutate: setUserInfomation } =
    useSWR<UserInfomation>("userInfomation", null, {
      fallbackData: undefined,
    });

  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);

      return;
    }

    unsubscribe();
  });

  const fetchUser = useCallback(async () => {
    if (user) {
      const colRef = doc(firestore, "userInfomation", user.uid).withConverter(
        userConverter
      );
      const document = await getDoc(colRef);
      if (document.exists()) {
        setUserInfomation(document.data());
      }
    }

    return;
  }, [setUserInfomation, user]);

  const createUser = useCallback(async (id: string) => {
    const colRef = doc(firestore, "userInfomation", id).withConverter(
      userConverter
    );
    await setDoc(colRef, {
      name: "",
      profile: "",
    });
  }, []);

  return {
    user,
    userID: user?.uid,
    createUser,
    userInfomation,
    fetchUser,
    setUser,
  };
};