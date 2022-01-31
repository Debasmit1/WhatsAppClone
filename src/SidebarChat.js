import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import { Avatar } from "@mui/material";
import db from "./firebase";
import { Link, useParams } from "react-router-dom";
import {
  onSnapshot,
  doc,
  //   setDoc,
  addDoc,
  collection,
  query,
  orderBy,
} from "firebase/firestore";

function SidebarChat({ id, name, addNewChat }) {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState("");
  const { roomId } = useParams();

  useEffect(() => {
    if (id) {
      onSnapshot(
        query(
          collection(db, `rooms/${id}/messages`),
          orderBy("timestamp", "desc")
        ),
        (data) => {
          setMessages(data.docs.map((el) => el.data()));
        }
      );
    }
  }, [id]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt("Please enter name for chat");

    if (roomName) {
      //do some stuff
      addDoc(collection(db, "rooms"), {
        name: roomName,
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar
          src={`https://avatars.dicebear.com/api/adventurer/${seed}/.svg`}
        />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add new Chat</h2>
    </div>
  );
}

export default SidebarChat;
