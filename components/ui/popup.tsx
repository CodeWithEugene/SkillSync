"use client"

import { useEffect } from "react"
import { Button } from "./button"

interface PopupProps {
  isOpen: boolean
  onClose: () => void
  title: string
  message: string
  buttonText?: string
}

export function Popup({ isOpen, onClose, title, message, buttonText = "OK" }: PopupProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Popup */}
      <div className="relative w-full max-w-md">
        <div className="glass glass-hover rounded-2xl p-6 space-y-4 animate-in fade-in-0 zoom-in-95 duration-300">
          {/* Icon */}
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          {/* Content */}
          <div className="text-center space-y-3">
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <p className="text-white/70 text-sm leading-relaxed">{message}</p>
          </div>
          
          {/* Button */}
          <Button 
            onClick={onClose}
            className="w-full mt-6"
            size="lg"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  )
}