"use client"

import React from "react"
import { Button } from "@/src/components/ui/button"

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[#FAF3E0]">
          <div className="text-center max-w-md">
            <h1 className="text-2xl font-bold text-[#3E3E3E] mb-4">
              Ops! Algo deu errado
            </h1>
            <p className="text-[#6B6B6B] mb-6">
              Não se preocupe, estamos trabalhando para resolver isso. Tente recarregar a página.
            </p>
            <Button
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.location.reload()
                }
              }}
              className="bg-[#D4A373] hover:bg-[#C4935F] text-white"
            >
              Recarregar Página
            </Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

