function normalizeMessage(msg) {
  const text =
    (msg &&
      (msg.message || msg.text || msg.message?.message || msg.text?.content)) ||
    "";
  const from =
    msg.fromUserID || msg.senderUserID || (msg && msg.userID) || "unknown";
  const id = msg.messageID || msg.msgID || `${from}-${Date.now()}`;
  const timestamp = msg.timestamp || msg.serverTime || Date.now();
  return { id, text, from, timestamp, raw: msg };
}

const testUsers = [
  {
    id: "A",
    name: "Emma",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
  {
    id: "B",
    name: "James",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  },
];


  const [zimInstance, setZimInstance] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Call state
  const [callOpen, setCallOpen] = useState(false);
  const [callType, setCallType] = useState("video");
  const [isCaller, setIsCaller] = useState(false);

  // Incoming call state
  const [incomingCall, setIncomingCall] = useState(null); // { from, callType, callerInfo }
  const [callRoomId, setCallRoomId] = useState(null);

  const messageEndRef = useRef(null);