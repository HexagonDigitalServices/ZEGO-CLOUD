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

 <div className="flex-1 flex overflow-hidden">
          {/* Sidebar Overlay - Mobile */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <aside
            className={`
            fixed md:relative inset-y-0 left-0 z-50 
            w-80 max-w-[85vw] md:w-80 
            transform transition-transform duration-300 ease-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
            flex flex-col
            bg-linear-to-b from-[#121216] to-[#0a0a0a]
            border-r border-white/5
          `}
          >
            {/* Sidebar Header */}
            <div className="p-5 border-b border-white/5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="relative w-10 h-10 rounded-xl bg-linear-to-r from-rose-500 to-amber-500 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white fill-white" />
                  </div>
                  <Link
                    to="/"
                    className="font-serif italic font-bold bg-linear-to-r from-rose-300 via-amber-300 to-rose-300 bg-clip-text text-transparent"
                  >
                    MyType
                  </Link>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="md:hidden p-2 text-zinc-400 hover:text-zinc-200 rounded-full hover:bg-white/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-zinc-400">
                Connect with your match 💕
              </p>
            </div>

            {/* User Selection */}
            <div className="p-5">
              <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">
                Select Profile
              </p>
              <div className="space-y-2">
                {testUsers.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => handleSelectUser(u.id)}
                    className={`group relative w-full rounded-2xl overflow-hidden transition-all duration-200 ${
                      selectedUser === u.id
                        ? "shadow-lg shadow-rose-500/25"
                        : ""
                    }`}
                  >
                    {/* linear border for selected */}
                    {selectedUser === u.id ? (
                      <>
                        <div className="absolute inset-0 bg-linear-to-r from-rose-500 via-amber-500 to-violet-500"></div>
                        <div className="relative flex items-center gap-3 p-3 bg-linear-to-r from-rose-500 to-amber-500 text-white">
                          <img
                            src={u.avatar}
                            alt={u.name}
                            className="w-12 h-12 rounded-full object-cover ring-2 ring-white/20"
                          />
                          <div className="text-left">
                            <p className="font-semibold">{u.name}</p>
                            <p className="text-xs text-white/80">
                              {u.id === "A"
                                ? "Looking for love"
                                : "Ready to mingle"}
                            </p>
                          </div>
                          <Sparkles className="w-5 h-5 ml-auto" />
                        </div>
                      </>
                    ) : (
                      <>
                        {/* linear border for unselected */}
                        <div className="absolute inset-0 bg-linear-to-r from-rose-500 via-amber-500 to-violet-500 opacity-60 group-hover:opacity-100 transition-all duration-300"></div>
                        <div className="relative flex items-center gap-3 p-3 m-px bg-[#0a0a0a] rounded-2xl">
                          <img
                            src={u.avatar}
                            alt={u.name}
                            className="w-12 h-12 rounded-full object-cover ring-2 ring-white/20"
                          />
                          <div className="text-left">
                            <p className="font-semibold text-white">{u.name}</p>
                            <p className="text-xs bg-linear-to-r from-rose-300 via-amber-300 to-violet-300 bg-clip-text text-transparent">
                              {u.id === "A"
                                ? "Looking for love"
                                : "Ready to mingle"}
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Login/Logout */}
            <div className="px-5 pb-5">
              {!isLoggedIn ? (
                <button
                  onClick={handleLogin}
                  disabled={!selectedUser || isConnecting}
                  className="group relative w-full rounded-xl overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-rose-500 via-amber-500 to-violet-500 opacity-80 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="absolute inset-px bg-[#0a0a0a] rounded-xl"></div>
                  <div className="relative flex items-center justify-center gap-2 py-3 font-semibold bg-linear-to-r from-rose-300 via-amber-300 to-violet-300 bg-clip-text text-transparent">
                    {isConnecting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-rose-300/30 border-t-rose-300 rounded-full animate-spin" />
                        Connecting...
                      </span>
                    ) : (
                      <>
                        <MessageCircle className="w-5 h-5 text-rose-400" />
                        <span>Start Chat</span>
                      </>
                    )}
                  </div>
                </button>
              ) : (
                <div className="bg-linear-to-r from-rose-500/10 to-amber-500/10 rounded-2xl p-4 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={
                            testUsers.find((u) => u.id === selectedUser)?.avatar
                          }
                          alt=""
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="online-indicator absolute -bottom-0.5 -right-0.5" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">
                          {userInfo?.userName}
                        </p>
                        <p className="text-xs text-emerald-400 font-medium">
                          Online
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="p-2 text-zinc-400 hover:text-rose-400 hover:bg-white/5 rounded-xl transition-colors"
                      title="Logout"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Match Info */}
            {isLoggedIn && (
              <div className="px-5 mt-auto pb-5">
                <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">
                  Chatting with
                </p>
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/10">
                  <div className="relative">
                    <img
                      src={partnerUser.avatar}
                      alt={partnerUser.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="online-indicator absolute -bottom-0.5 -right-0.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white">
                      {partnerUser.name}
                    </p>
                    <p className="text-xs text-zinc-400">Your match 💕</p>
                  </div>
                </div>

                {/* Quick call buttons */}
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={startVoiceCall}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-amber-500/20 text-amber-300 rounded-xl font-medium hover:bg-amber-500/30 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">Voice</span>
                  </button>
                  <button
                    onClick={startVideoCall}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-rose-500/20 text-rose-300 rounded-xl font-medium hover:bg-rose-500/30 transition-colors"
                  >
                    <Video className="w-4 h-4" />
                    <span className="text-sm">Video</span>
                  </button>
                </div>
              </div>
            )}
          </aside>

          {/* Main Chat Area */}
          <main className="flex-1 flex flex-col min-w-0 bg-linear-to-br from-[#0a0a0a] to-[#121216]">
            {/* Chat Header - Desktop */}
            <div className="hidden md:flex items-center justify-between px-6 py-4 glass bg-[#121216]/50 backdrop-blur-xl border-b border-white/5">
              <div className="flex items-center gap-4">
                {isLoggedIn && (
                  <div className="relative">
                    <img
                      src={partnerUser.avatar}
                      alt={partnerUser.name}
                      className="w-11 h-11 rounded-full object-cover"
                    />
                    <div className="online-indicator absolute -bottom-0.5 -right-0.5" />
                  </div>
                )}
                <div>
                  <h2 className="font-semibold text-white">
                    {isLoggedIn
                      ? partnerUser.name
                      : "Select a profile to start"}
                  </h2>
                  <p className="text-xs text-zinc-400">
                    {isLoggedIn
                      ? "Online • Matched with you"
                      : "Your conversations appear here"}
                  </p>
                </div>
              </div>

              {/* Desktop call buttons */}
              {isLoggedIn && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={startVoiceCall}
                    className="p-3 text-amber-400 rounded-full hover:bg-white/5 transition-colors"
                    title="Voice call"
                  >
                    <Phone className="w-5 h-5" />
                  </button>
                  <button
                    onClick={startVideoCall}
                    className="p-3 text-rose-400 rounded-full hover:bg-white/5 transition-colors"
                    title="Video call"
                  >
                    <Video className="w-5 h-5" />
                  </button>
                  <div className="ml-2 flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 rounded-full">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-xs font-medium text-emerald-400">
                      Connected
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              <div className="max-w-2xl mx-auto space-y-3">
                {messages.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
                    <h3 className="font-semibold text-lg text-white mb-2">
                      No messages yet
                    </h3>
                    <p className="text-zinc-400 text-sm max-w-xs">
                      {isLoggedIn
                        ? `Say hello to ${partnerUser.name}! 👋`
                        : "Select a profile and start chatting"}
                    </p>
                  </div>
                )}

                {messages.map((m) => {
                  const fromMe = userInfo && m.from === userInfo.userID;
                  const isSystem = m.from === "system";

                  if (isSystem) {
                    return (
                      <div key={m.id} className="flex justify-center my-4">
                        <div className="message-system">{m.text}</div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={m.id}
                      className={`flex ${fromMe ? "justify-end" : "justify-start"}`}
                    >
                      {!fromMe && (
                        <img
                          src={partnerUser.avatar}
                          alt=""
                          className="w-8 h-8 rounded-full object-cover mr-2 mt-auto shrink-0"
                        />
                      )}
                      <div
                        className={`message-bubble ${fromMe ? "message-sent" : "message-received"}`}
                      >
                        <p className="text-sm leading-relaxed wrap-break-words whitespace-pre-wrap">
                          {m.text}
                        </p>
                        <p
                          className={`text-[10px] mt-1.5 text-right ${fromMe ? "text-white/60" : "text-surface-400"}`}
                        >
                          {formatTime(m.timestamp)}
                        </p>
                      </div>
                    </div>
                  );
                })}
                <div ref={messageEndRef} />
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 md:p-6 glass bg-[#121216]/50 backdrop-blur-xl border-t border-white/5">
              <div className="max-w-2xl mx-auto">
                <div className="flex items-end gap-3">
                  <div className="flex-1 relative">
                    <textarea
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={onKeyDown}
                      placeholder={
                        isLoggedIn
                          ? "Type your message..."
                          : "Login to send messages"
                      }
                      disabled={!isLoggedIn}
                      rows={1}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 resize-none min-h-13 max-h-32 focus:border-rose-400/50 focus:ring-2 focus:ring-rose-400/20 transition-all disabled:opacity-50"
                      style={{ paddingTop: "14px", paddingBottom: "14px" }}
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!isLoggedIn || !messageText.trim()}
                    className="btn btn-primary btn-icon w-13 h-13 shrink-0"
                    aria-label="Send message"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-xs text-zinc-500 mt-2 text-center md:text-left">
                  Press Enter to send • Shift+Enter for new line
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
