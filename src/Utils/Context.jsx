import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { FirebaseAuth, db } from "./Firebase";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";

export const firebaseContext = createContext(null);

export const AuthLogic = () => {
  const { setUser } = useContext(firebaseContext);
  const nevigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, (user) => {
      if (user) {
        setUser(user);
        nevigate("/");
      }
    });
  }, []);

  return null;
};

export const addToCart = async (product, user, notify) => {
  const cartRef = doc(db, "carts", user.uid);
  const cartSnap = await getDoc(cartRef);

  let items = [];

  if (cartSnap.exists()) {
    items = cartSnap.data().items || [];

    const existingItem = items.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
      notify("Increase Product Count!");
    } else {
      items.push({ ...product, quantity: 1 });
      notify("Product Added Successfully!");
    }
  } else {
    items = [{ ...product, quantity: 1 }];
    notify("Increase Product Count!");
  }

  await setDoc(cartRef, { items });

  console.log("Added to cart!");
};

export const getCartData = async (user) => {
  if (!user || !user.uid) return [];

  const cartRef = doc(db, "carts", user.uid);
  const cartSnap = await getDoc(cartRef);

  if (cartSnap.exists()) {
    const items = await cartSnap.data().items;
    return items;
  } else {
    return [];
  }
};

export const removeFromCart = async (id, user) => {
  if (!user || !user.uid) return;

  const cartRef = doc(db, "carts", user.uid);
  const cartSnap = await getDoc(cartRef);
  const items = await cartSnap.data().items;
  const updateItems = items.filter((item) => item.id !== id);

  await updateDoc(cartRef, {
    items: updateItems,
  });
};

export const increaseQuntity = async (id, user) => {
  if (!user || !user.uid) return;

  const cartRef = doc(db, "carts", user.uid);
  const cartSnap = await getDoc(cartRef);

  const items = cartSnap.data().items;
  const existingItem = items.find((item) => item.id === id);
  existingItem.quantity += 1;
  await setDoc(cartRef, { items });
};

export const decreaseQuantity = async (id, user) => {
  if (!user || !user.uid) return;

  const cartRef = doc(db, "carts", user.uid);
  const cartSnap = await getDoc(cartRef);

  if (cartSnap.exists()) {
    const items = cartSnap.data().items;
    const existingItem = items.find((item) => item.id === id);
    if (existingItem.quantity == 1) {
      await removeFromCart(id, user);
    } else {
      existingItem.quantity -= 1;
      await setDoc(cartRef, { items });
    }
  }
};

export const purchase = async (user) => {
  const items = await getCartData(user);

  if (items.length != 0) {
    const orderRef = collection(db, "orders", user.uid, "userOrders");

    await addDoc(orderRef, {
      items: items,
      createdAt: new Date(),
    });

    const cartRef = doc(db, "carts", user.uid);

    await updateDoc(cartRef, {
      items: [],
    });
  }
};

export const getOrders = async (user) => {
  if (!user || !user.uid) return [];

  try {
    const orderRef = collection(db, "orders", user.uid, "userOrders");
    const orderSnap = await getDocs(orderRef);
    const allOrders = orderSnap.docs.map((doc) => ({
      ...doc.data(),
    }));

    return allOrders;
  } catch (err) {
    console.error("Error fetching orders:", err.message);
    return [];
  }
};
