import * as React from "react"
import { useAuth } from "@/hooks/useAuth"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)
  const { profile } = useAuth()

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      // Check device preference first, then fallback to screen size
      if (profile?.device_preference) {
        setIsMobile(profile.device_preference === 'mobile')
      } else {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
      }
    }
    mql.addEventListener("change", onChange)
    
    // Initial check
    if (profile?.device_preference) {
      setIsMobile(profile.device_preference === 'mobile')
    } else {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    return () => mql.removeEventListener("change", onChange)
  }, [profile?.device_preference])

  return !!isMobile
}
