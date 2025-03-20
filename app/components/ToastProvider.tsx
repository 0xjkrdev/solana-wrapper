"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from "lucide-react"

type ToastType = "success" | "error" | "info" | "warning"

interface Toast {
    id: string
    message: string
    type: ToastType
    isExiting?: boolean
}

interface ToastContextType {
    toasts: Toast[]
    showToast: (message: string, type: ToastType) => void
    hideToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([])

    const showToast = (message: string, type: ToastType) => {
        const id = Math.random().toString(36).substring(2, 9)
        setToasts((prev) => [...prev, { id, message, type }])

        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            hideToast(id)
        }, 5000)
    }

    const hideToast = (id: string) => {
        setToasts((prev) =>
            prev.map((toast) =>
                toast.id === id ? { ...toast, isExiting: true } : toast
            )
        )

        // Remove from state after animation completes
        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id))
        }, 500)
    }

    const getToastIcon = (type: ToastType) => {
        switch (type) {
            case "success":
                return <CheckCircle className="h-5 w-5" />
            case "error":
                return <AlertCircle className="h-5 w-5" />
            case "warning":
                return <AlertTriangle className="h-5 w-5" />
            case "info":
                return <Info className="h-5 w-5" />
        }
    }

    return (
        <ToastContext.Provider value={{ toasts, showToast, hideToast }}>
            {children}
            <div className="fixed bottom-24 right-4 z-50 flex flex-col gap-3 max-w-md">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`transform transition-all duration-500 ease-in-out ${toast.isExiting
                                ? "translate-x-full opacity-0"
                                : "translate-x-0"
                            }`}
                    >
                        <div
                            className={`rounded-lg shadow-lg flex items-center p-4 backdrop-blur-md ${toast.type === "success"
                                    ? "bg-green-600/90 text-white border-l-4 border-green-800"
                                    : toast.type === "error"
                                        ? "bg-red-600/90 text-white border-l-4 border-red-800"
                                        : toast.type === "warning"
                                            ? "bg-yellow-500/90 text-white border-l-4 border-yellow-700"
                                            : "bg-blue-600/90 text-white border-l-4 border-blue-800"
                                }`}
                        >
                            <div className="flex-shrink-0 mr-3">
                                {getToastIcon(toast.type)}
                            </div>
                            <div className="flex-1 mr-2">
                                <p className="text-sm font-medium">
                                    {toast.message}
                                </p>
                            </div>
                            <button
                                onClick={() => hideToast(toast.id)}
                                className="flex-shrink-0 ml-auto text-white hover:text-gray-200 transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    )
}

export function useToast() {
    const context = useContext(ToastContext)
    if (context === undefined) {
        throw new Error("useToast must be used within a ToastProvider")
    }
    return context
}
