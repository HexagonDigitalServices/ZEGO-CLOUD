
{  isOpen,
  onClose,
  callType,
  localUser,
  remoteUser,
  roomId,
  isCaller}

  const [zg, setZg] = useState(null);
  const [callState, setCallState] = useState("connecting");
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(callType === "voice");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [localStream, setLocalStream] = useState(null);
  const [localMediaStream, setLocalMediaStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [callDuration, setCallDuration] = useState(0);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const remoteAudioRef = useRef(null);
  const timerRef = useRef(null);
  const zgRef = useRef(null);
  const localStreamRef = useRef(null);
  const publishedStreamIdRef = useRef(null);

  