
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-32 bg-linear-to-b from-transparent via-rose-400/20
             to-transparent"
            style={{
              left: `${10 + i * 12}%`,
              top: "30%",
              animation: `float-vertical ${3 + i * 0.5}s ease-in-out infinite ${i * 0.2}s`,
              transform: `translateY(${Math.sin(Date.now() / 1000 + i) * 20}px)`,
            }}
          />
        ))}
    

          {[
            {
              icon: <Video className="h-5 w-5" />,
              label: "HD Video",
              color: "from-rose-400 to-rose-600",
            },
            {
              icon: <Phone className="h-5 w-5" />,
              label: "Voice Call",
              color: "from-amber-400 to-amber-600",
            },
            {
              icon: <MessageCircle className="h-5 w-5" />,
              label: "Live Chat",
              color: "from-violet-400 to-violet-600",
            },
            {
              icon: <Heart className="h-5 w-5" />,
              label: "Smart Match",
              color: "from-pink-400 to-pink-600",
            },
          ].map((feature, idx) => (
           
          ))}
    

       {[
            {
              value: "2M+",
              label: "Active Connections",
              color: "text-rose-300",
            },
            {
              value: "500K+",
              label: "Video Dates Weekly",
              color: "text-amber-300",
            },
            {
              value: "98%",
              label: "Satisfaction Rate",
              color: "text-violet-300",
            },
            {
              value: "<2s",
              label: "Match Response Time",
              color: "text-emerald-300",
            },
          ].map((stat, idx) => (
           
          ))}
 