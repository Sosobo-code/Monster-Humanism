"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [stage, setStage] = useState(0)
  const [audioLoaded, setAudioLoaded] = useState(false)
  const [audioPlaying, setAudioPlaying] = useState(false)
  const router = useRouter()

  // Audio reference
  let audioRef: HTMLAudioElement | null = null

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef = new Audio("/drift-mind.mp3")
      audioRef.loop = true
      setAudioLoaded(true)
    }

    return () => {
      if (audioRef) {
        audioRef.pause()
        audioRef = null
      }
    }
  }, [])

  const startExperience = () => {
    if (audioRef && audioLoaded && !audioPlaying) {
      audioRef.play().catch((error) => {
        console.error("Audio playback failed:", error)
      })
      setAudioPlaying(true)
    }
    setStage(1)
  }

  const advanceStage = () => {
    if (stage < 3) {
      setStage(stage + 1)
    }
  }

  return (
    <AnimatePresence mode="wait">
      {stage === 0 && (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center justify-center min-h-screen bg-black text-white"
        >
          <Button onClick={startExperience} variant="outline" className="text-white border-white hover:bg-white/10">
            Click to Continue
          </Button>
        </motion.div>
      )}

      {stage === 1 && (
        <motion.div
          key="first-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 text-center"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl max-w-2xl mb-12 font-serif">
            What is a life worth? Are all lives equal, or do some matter more than others?
          </h2>
          <Button onClick={advanceStage} variant="ghost" className="text-white hover:bg-white/10 mt-8">
            Continue
          </Button>
        </motion.div>
      )}

      {stage === 2 && (
        <motion.div
          key="second-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif">Who decides life?</h2>
          <Button onClick={advanceStage} variant="ghost" className="text-white hover:bg-white/10 mt-12">
            Continue
          </Button>
        </motion.div>
      )}

      {stage === 3 && (
        <motion.div
          key="main-ui"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="min-h-screen wooden-table-bg p-4 md:p-8 lg:p-12 flex items-center justify-center"
        >
          <div className="case-file-container w-full max-w-5xl aspect-[4/3] bg-[#e6dcc6] rounded-md shadow-lg p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/folder-texture.png')] opacity-20 rounded-md pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-[30px] bg-[#d4c5a8] border-b border-[#c0b296]"></div>
            <div className="absolute top-[15px] right-[15px] w-[100px] h-[20px] bg-white/80 flex items-center justify-center">
              <p className="text-xs text-gray-600 font-mono">CONFIDENTIAL</p>
            </div>

            <h1 className="text-2xl md:text-3xl font-serif text-gray-800 mb-6 mt-4">Character Profiles</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ProfileCard
                name="Johan Liebert"
                imageSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/johan-liebert-sdqDUQssSQIKAxJlOTuj2Mf2vx14d7.png"
                imageAlt="Johan Liebert as a child in hospital"
              />

              <ProfileCard
                name="Dr. Kenzo Tenma"
                imageSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/drkenzotenma-PSRw5Ne11Khn40VYFMebWjUIT2r8tW.png"
                imageAlt="Dr. Kenzo Tenma portrait"
              />

              <ProfileCard
                name="Nina Fortner"
                imageSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ninafortner-1TTdX45rxCNIOG7ckDSPqGNVLRpgcp.png"
                imageAlt="Nina Fortner portrait"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

interface ProfileCardProps {
  name: string
  imageSrc: string
  imageAlt: string
}

function ProfileCard({ name, imageSrc, imageAlt }: ProfileCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white p-4 rounded shadow-md transform rotate-[-1deg] hover:shadow-lg transition-all duration-300 relative"
    >
      <div className="relative mb-6">
        {/* Photo with worn effect */}
        <div className="relative mt-4">
          <div className="absolute inset-0 bg-[#000000] opacity-5 mix-blend-multiply pointer-events-none z-10 rounded"></div>
          <div className="absolute inset-0 bg-[url('/dust-scratches.png')] opacity-30 mix-blend-overlay pointer-events-none z-10 rounded"></div>
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={imageAlt}
            width={300}
            height={200}
            className="w-full h-[200px] object-cover object-center rounded border border-gray-300 shadow-sm"
          />

          {/* Worn edges and corners */}
          <div className="absolute top-[-2px] right-[-2px] w-[20px] h-[20px] bg-white rounded-bl-lg z-5"></div>
          <div className="absolute bottom-[-2px] left-[-2px] w-[15px] h-[15px] bg-white rounded-tr-lg z-5"></div>
        </div>
      </div>

      {/* Handwritten-style label */}
      <div className="border-t border-gray-300 pt-2 mt-2">
        <h3 className="font-serif text-xl text-center text-gray-800">{name}</h3>
      </div>

      {/* Stamp-like effect */}
      <div className="absolute bottom-2 right-2 text-[10px] text-gray-400 transform rotate-[-5deg]">
        Case #: 1997-2008
      </div>
    </motion.div>
  )
}
