import React, { useState, useEffect } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";
import { useParams } from "react-router-dom";
import {
  onSnapshot,
  doc,
  //   setDoc,
  addDoc,
  collection,
  query,
  orderBy,
} from "firebase/firestore";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import { FirebaseError } from "firebase/app";

function Chat() {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (roomId) {
      onSnapshot(doc(db, "rooms", roomId), (snapshot) =>
        setRoomName(snapshot.data().name)
      );

      //    doc(db,'rooms',roomId)
      //    .collection("messages")
      //    .orderBy('timestamp','asc')
      //    .onSnapshot(snapshot => (
      //        setMessages(snapshot.docs.map(doc =>
      //         doc.data()))
      //    ))

      onSnapshot(
        query(
          collection(db, `rooms/${roomId}/messages`),
          orderBy("timestamp", "asc")
        ),
        (data) => {
          setMessages(data.docs.map((el) => ({ id: el.id, ...el.data() })));
        }
      );
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = () => {
    console.log("You typed  >>> ", input);

    const msgRef = collection(db, `rooms/${roomId}/messages`);
    addDoc(msgRef, {
      message: input,
      name: user.displayName,
      timestamp: Math.floor(new Date()),
    });

    setInput(" ");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/micah/${seed}/.svg`} />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            Last seen {new Date().getHours() + `:` + new Date().getMinutes()}
          </p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message) => (
          <p
            key={message.id}
            className={`chat__message ${
              message.name === user.displayName && "chat__receiver"
            }`}
          >
            <span className="chat__name">
              {message.name.length > 8
                ? message.name.slice(0, 8)
                : message.name}
            </span>
            {message.message}
            <span className="chat__timestamp">
              {new Date(message.timestamp).getHours() < 10
                ? `0${new Date(message.timestamp).getHours()}`
                : new Date(message.timestamp).getHours()}
              :
              {new Date(message.timestamp).getMinutes() < 10
                ? `0${new Date(message.timestamp).getMinutes()}`
                : new Date(message.timestamp).getMinutes()}
            </span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <InsertEmoticonIcon />
        <input
          type="text"
          placeholder="Type a message"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />
        <button onClick={sendMessage} type="button">
          Send a message
        </button>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
